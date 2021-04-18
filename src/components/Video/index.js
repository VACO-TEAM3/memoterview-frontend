import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import useUserMedia from "../../hooks/useUserMedia";

export default function Video() {
  const ref = useRef(null);
  const peers = {};
  const pendingCandidates = {};
  const configuration = {
    iceServers: [
      { url: "stun:stun.l.google.com:19302" },
      { url: "stun:stun3.l.google.com:19302" }
    ],
  };
  const mediaConfiguration = { video: true, audio: true };

  const { localStream } = useUserMedia(mediaConfiguration);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
  }).connect();

  socket.on("join", (id, members) => {
    console.log(members);
    peers[id] = createPeerConnection(id);
    sendOffer(id);
    addPendingCandidates(id);
  });

  socket.on("message", (fromId, data) => {
    handleSignalingData(fromId, data);
  });

  socket.emit("join", { room: "chat" });

  useEffect(() => {
    console.log(25);
  }, [peers]);

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
    const peerConnection = new RTCPeerConnection(configuration);
    
    peerConnection.onicecandidate = onIceCandidate(id);
    peerConnection.onaddstream = onAddStream;

    if (localStream) {
      peerConnection.addStream(localStream);
    }
    
    return peerConnection;
  }
  
  async function sendOffer(sid) {
    try {
      const remoteDescription = await peers[sid].createOffer();
    
      setAndSendLocalDescription(sid, remoteDescription);
    } catch (error) {
      console.error(error);
    }
  }

  async function sendAnswer(sid) {
    try {
      const remoteDescription = await peers[sid].createAnswer();

      setAndSendLocalDescription(sid, remoteDescription);
    } catch (error) {
      console.error(error);
    }
  }

  function setAndSendLocalDescription(sid, sessionDescription) {
    peers[sid].setLocalDescription(sessionDescription);

    socket.emit("message", sid, { type: sessionDescription.type, sdp: sessionDescription.sdp });
  }

  function addPendingCandidates(sid) {
    if (pendingCandidates.hasOwnProperty(sid)) {
      pendingCandidates[sid].forEach((candidate) => {
        peers[sid].addIceCandidate(new RTCIceCandidate(candidate));
      });
    }
  }

  function handleSignalingData(sid, data) {
    delete data.sid;
    
    switch (data.type) {
      case "offer":
        peers[sid] = createPeerConnection(sid);
        peers[sid].setRemoteDescription(new RTCSessionDescription(data));

        sendAnswer(sid);
        addPendingCandidates(sid);
        break;
      case "answer":
        peers[sid].setRemoteDescription(new RTCSessionDescription(data));
        break;
      case "candidate":
        if (peers.hasOwnProperty(sid)) {
          peers[sid].addIceCandidate(new RTCIceCandidate(data.candidate));
          break;
        }

        if (!pendingCandidates.hasOwnProperty(sid)) {
          pendingCandidates[sid] = [];
        }

        pendingCandidates[sid].push(data.candidate);
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
    <div className="peers" ref={ref}>
    </div>
  );
}
