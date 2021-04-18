import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function useWebRTC() {
  const ref = useRef(null);
  const peers = {};
  const pendingCandidates = {};
  const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
  let localStream;
  let isVideoMuted = false;

  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
  }).connect();

  socket.emit("join", { room: "chat" });
  socket.on("join", (id, members) => {
    peers[id] = createPeerConnection(id);
    sendOffer(id);
    addPendingCandidates(id);
  });

  socket.on("message", (fromId, data) => {
    handleSignalingData(fromId, data);
  });

  async function getLocalStream() {
    const constraints = { video: true, audio: true };

    localStream = await navigator.mediaDevices.getUserMedia(constraints);

    navigator.mediaDevices.getUserMedia(constraints);
  }

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
      const sessionDescription = await peers[sid].createOffer();
    
      setAndSendLocalDescription(sid, sessionDescription);
    } catch (error) {
      console.error(error);
    }
  }

  async function sendAnswer(sid) {
    try {
      const sessionDescription = await peers[sid].createAnswer();

      setAndSendLocalDescription(sid, sessionDescription);
    } catch (error) {
      console.error(error);
    }
  }

  function setAndSendLocalDescription(sid, sessionDescription) {
    peers[sid].setLocalDescription(sessionDescription);
    socket.emit("message", sid, { type: sessionDescription.type, sdp: sessionDescription.sdp });
  }

  function addPendingCandidates(sid) {
    if (sid in pendingCandidates) {
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
        if (sid in peers) {
          peers[sid].addIceCandidate(new RTCIceCandidate(data.candidate));
        } else {
          if (!(sid in pendingCandidates)) {
            pendingCandidates[sid] = [];
          }
          pendingCandidates[sid].push(data.candidate);
        }
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
    isVideoMuted = !isVideoMuted;
  }
  
  getLocalStream();

  return { ref };
}
