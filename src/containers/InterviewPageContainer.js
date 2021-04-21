import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";

import { Video } from "../components/Video";
import { mediaStreaming } from "../utils/media";

export default function InterviewPageContainer() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const peerList = [];
  const roomID = "happy";
  const socket = io.connect("http://localhost:5000");

  useEffect(() => {
    socket.emit("join room", roomID, async () => {
      const stream = await mediaStreaming.Initialize();
      userVideo.current.srcObject = stream;
      setIsStreaming(true);
    });

    socket.on("all users", (users) => {
      console.log(users);
      users.forEach((userID) => {
        const peer = createPeer(userID, socket.id, mediaStreaming.getStream());

        peersRef.current.push({
          peerID: userID,
          peer,
        });

        peerList.push(peer);
      });
    });

    function createPeer(userToSignal, callerID, stream) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        console.log(signal);
        socket.emit("sending signal", { userToSignal, callerID, signal });
      });

      return peer;
    }

    setPeers(peerList);
  }, []);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    socket.on("user joined", (payload) => {
      console.log(payload);
      const peer = addPeer(payload.signal, payload.callerID, mediaStreaming.getStream());

      peersRef.current.push({
        peerID: payload.callerID,
        peer,
      });

      setPeers((users) => [...users, peer]);
    });

    socket.on("receiving returned signal", (payload) => {
      console.log(payload);
      const item = peersRef.current.find((p) => p.peerID === payload.id);

      item.peer.signal(payload.signal);
    });

    function addPeer(incomingSignal, callerID, stream) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        console.log(signal);
        socket.emit("returning signal", { signal, callerID });
      });

      peer.signal(incomingSignal);

      return peer;
    }
  }, [isStreaming]);

  return (
    <>
      <video ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => (
        <Video key={index} peer={peer} />
      ))}
    </>
  );
}
