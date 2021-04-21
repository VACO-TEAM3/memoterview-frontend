import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { iceConfiguration, mediaConfiguration } from "../constants/config";
import useUserMedia from "../hooks/useUserMedia";
import Interview from "../pages/Interview";

export default function InterviewContainer() {
  const { state } = useSelector(state => ({ state }));
  const [isInterviewer, setIsInterviewer] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const ref = useRef(null);
  const peers = useRef({});
  const pendingCandidates = useRef({});
  console.log(state);
  const { localStream } = useUserMedia(mediaConfiguration);

  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
  }).connect();

  socket.on("join", (id, members) => {
    console.log(members);
    peers.current[id] = createPeerConnection(id);
    sendOffer(id);
    addPendingCandidates(id);
  });

  socket.on("message", (fromId, data) => {
    handleSignalingData(fromId, data);
  });

  socket.emit("join", { room: "chat" });

  useEffect(() => {
    console.log(25);
  }, [peers.current]);

  function onIceCandidate(id) {
    return function (event) {
      if (event.candidate) {
        socket.emit("message", id, {
          type: "candidate",
          candidate: event.candidate,
        });
      }
    };
  }

  function onAddStream(event) {
    const newRemoteStreamElem = document.createElement("video");
    
    newRemoteStreamElem.autoplay = true;
    newRemoteStreamElem.srcObject = event.stream;

    ref.current?.appendChild(newRemoteStreamElem);
  }

  function createPeerConnection(id) {
    const peerConnection = new RTCPeerConnection(iceConfiguration);
    
    peerConnection.onicecandidate = onIceCandidate(id);
    peerConnection.onaddstream = onAddStream;

    if (localStream) {
      peerConnection.addStream(localStream);
    }
    
    return peerConnection;
  }
  
  async function sendOffer(sid) {
    try {
      const remoteDescription = await peers.current[sid].createOffer();
    
      setAndSendLocalDescription(sid, remoteDescription);
    } catch (error) {
      console.error(error);
    }
  }

  async function sendAnswer(sid) {
    try {
      const remoteDescription = await peers.current[sid].createAnswer();

      setAndSendLocalDescription(sid, remoteDescription);
    } catch (error) {
      console.error(error);
    }
  }

  function setAndSendLocalDescription(sid, sessionDescription) {
    peers.current[sid].setLocalDescription(sessionDescription);

    socket.emit("message", sid, { type: sessionDescription.type, sdp: sessionDescription.sdp });
  }

  function addPendingCandidates(sid) {
    if (pendingCandidates.current.hasOwnProperty(sid)) {
      pendingCandidates.current[sid].forEach((candidate) => {
        peers.current[sid].addIceCandidate(new RTCIceCandidate(candidate));
      });
    }
  }

  function handleSignalingData(sid, data) {
    delete data.sid;
    
    switch (data.type) {
      case "offer":
        peers.current[sid] = createPeerConnection(sid);
        peers.current[sid].setRemoteDescription(new RTCSessionDescription(data));

        sendAnswer(sid);
        addPendingCandidates(sid);
        break;
      case "answer":
        peers.current[sid].setRemoteDescription(new RTCSessionDescription(data));
        break;
      case "candidate":
        if (peers.current.hasOwnProperty(sid)) {
          peers.current[sid].addIceCandidate(new RTCIceCandidate(data.candidate));
          break;
        }

        if (!pendingCandidates.current.hasOwnProperty(sid)) {
          pendingCandidates.current[sid] = [];
        }

        pendingCandidates.current[sid].push(data.candidate);
        break;
      default:
        break;
    }
  }

  function muteVideo() {
    if (!isVideoMuted) {
      localStream?.getTracks()
        .filter((track) => track.kind === "video")
        .forEach((track) => {
          track.enabled = false;
        });
    } else {
      localStream.getTracks()[1].enabled = true;
    }
    setIsVideoMuted(!isVideoMuted);
  }

  return (
    <Interview peers={peers} videoRef={ref} />
  );
}
