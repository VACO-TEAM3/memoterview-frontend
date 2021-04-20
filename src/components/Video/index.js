<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
<<<<<<< HEAD

import useUserMedia from "../../hooks/useUserMedia";
=======
>>>>>>> [ADD] success multiple peer connetion

export default function Video() {
  const ref = useRef(null);
  const peers = {};
  const pendingCandidates = {};
<<<<<<< HEAD
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

=======
  const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
  let localStream;

  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
  }).connect();

  socket.emit("join", { room: "chat" });
  socket.on("join", (id, members) => {
    peers[id] = createPeerConnection(id);
    sendOffer(id);
    addPendingCandidates(id);
  });

  socket.on("message", (sid, data) => {
    handleSignalingData(sid, data);
  });

  function getLocalStream() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        console.log("Stream found");
        localStream = stream;
        // Connect after making sure thzat local stream is availble
      })
      .catch((error) => {
        console.error("Stream not found: ", error);
      });
  }

  function onIceCandidate(id) {
    return function (event) {
      if (event.candidate) {
        console.log("ICE candidate");
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
>>>>>>> [ADD] success multiple peer connetion
    ref.current?.appendChild(newRemoteStreamElem);
  }

  function createPeerConnection(id) {
<<<<<<< HEAD
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
=======
    const pc = new RTCPeerConnection(configuration);
    
    pc.onicecandidate = onIceCandidate(id);
    pc.onaddstream = onAddStream;

    if (localStream) {
      pc.addStream(localStream);
    }
    console.log("PeerConnection created");
    return pc;
  }

  function sendOffer(sid) {
    console.log("Send offer");
    peers[sid].createOffer().then(
      (sdp) => setAndSendLocalDescription(sid, sdp),
      (error) => {
        console.error("Send offer failed: ", error);
      }
    );
  }

  function sendAnswer(sid) {
    console.log("Send answer");
    peers[sid].createAnswer().then(
      (sdp) => setAndSendLocalDescription(sid, sdp),
      (error) => {
        console.error("Send answer failed: ", error);
      }
    );
  }

  function setAndSendLocalDescription(sid, sessionDescription) {
    peers[sid].setLocalDescription(sessionDescription);
    socket.emit("message", sid, { type: sessionDescription.type, sdp: sessionDescription.sdp });
  }

  function addPendingCandidates(sid) {
    if (sid in pendingCandidates) {
>>>>>>> [ADD] success multiple peer connetion
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
<<<<<<< HEAD

=======
>>>>>>> [ADD] success multiple peer connetion
        sendAnswer(sid);
        addPendingCandidates(sid);
        break;
      case "answer":
        peers[sid].setRemoteDescription(new RTCSessionDescription(data));
        break;
      case "candidate":
<<<<<<< HEAD
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
=======
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
  };
  // Start connection
  getLocalStream();
  // const videoRef = useRef(null);
  // const videoRef2 = useRef(null);

  // try {
  //   async function getMediaStream() {
  //     const constraints = { video: true, audio: true };
  //     const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
  //     mediaStream.getTracks().forEach((track) => {
  //       track.enabled = false;
  //     });
      
  //     const video = videoRef.current;
      
  //     // video.srcObject = mediaStream;
  //     // console.log(video.srcObject);
  //     const connections = {};
  //     const socket = io("http://localhost:5000", {
  //       transports: ["websocket"],
  //     }).connect();
      
  //     const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  //     socket.emit("join", { room: "chat" });
  //     socket.on("join", async (id, members) => {
  //       console.log(connections);

  //       if (!connections.hasOwnProperty(id)) {
  //         connections[id] = new RTCPeerConnection(configuration);
  //       }

  //       connections[id].onicecandidate = (ev) => {
  //         if (ev.candidate) {
  //           socket.emit("message", id, { type: "iceCandidate", iceCandidate: ev.candidate });
  //         }
  //       };

  //       connections[id].onaddstream = (event) => {
  //         if (video.srcObject) {
  //           videoRef2.current.srcObject = event.stream;
  //         } else {
  //           video.srcObject = event.stream;
  //         }
  //       };

  //       connections[id].addStream(mediaStream);

  //       if (members.length > 1) {
  //         const offer = await connections[id].createOffer();

  //         await connections[id].setLocalDescription(offer);
  //         socket.emit("message", id, offer);
  //       }
  //     });

  //     socket.on("message", async (fromId, message) => {
  //       console.log(message);
  //       if (message?.type === "answer") {
  //         const remoteDescription = new RTCSessionDescription(message);
          
  //         await connections[fromId]?.setRemoteDescription(remoteDescription);
  //       }

  //       if (message?.type === "offer") {
  //         const remoteDescription = new RTCSessionDescription(message);

  //         await connections[fromId]?.setRemoteDescription(remoteDescription);

  //         const answer = await connections[fromId]?.createAnswer();
          
  //         await connections[fromId]?.setLocalDescription(answer);
          
  //         socket.emit("message", socket.id, answer);
  //       }

  //       if (message?.type === "iceCandidate") {
  //         const candidate = new RTCIceCandidate({
  //           ...message.iceCandidate,
  //         });

  //         await connections[fromId]?.addIceCandidate(candidate);
  //       }
  //     });
  //   }

  //   getMediaStream(); // 왜 이렇게 해야 비동기 작업이 되는건지 영문을 모르겠네..?  
  // } catch (error) {
  //   console.error(error);
  // }

  return (
    <div className="peers" ref={ref}>
      {/* <video ref={videoRef2} autoPlay playsInline controls={false}></video>
      <video ref={videoRef} autoPlay playsInline controls={false}></video> */}
>>>>>>> [ADD] success multiple peer connetion
=======
export default function Video({ peers, videoRef }) {
  return (
<<<<<<< HEAD
    <div className="peers" ref={videoRef}>
>>>>>>> [REFACTOR] separate rtc directory
    </div>
=======
    <video playsInline autoPlay ref={videoRef}>
      <div>hi friend</div>
    </video>
>>>>>>> [FIX] multiple user error
=======
import { useEffect, useRef } from "react";

export default function Video({ peer }) {
  const ref = useRef();

  useEffect(() => {
    if (!peer) {
      return;
    }
    console.log(peer.on);
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <video playsInline autoPlay ref={ref} />
>>>>>>> [ADD] Video component
  );
}
