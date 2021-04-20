import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import { io } from "socket.io-client";

import Video from "../components/Video";
import { mediaStreaming } from "../utils/media";

export default function InterviewPageContainer() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const peerList = [];
  const socket = io.connect("http://localhost:5000");
  const { id } = useParams();

  useEffect(() => {
    socket.emit("join room", id, async () => {
      const stream = await mediaStreaming.Initialize();
      userVideo.current.srcObject = stream;
      setIsStreaming(true);
    });

    socket.on("all users", (users) => {
      users.forEach((userID) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: mediaStreaming.getStream(),
        });

        peer.on("signal", (signal) => {
          socket.emit("sending signal", { userToSignal: userID, callerID: socket.id, signal });
        });

        peersRef.current.push({
          peerID: userID,
          peer,
        });

        peerList.push(peer);
      });
    });

    setPeers(peerList);
  }, []);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    socket.on("user joined", (payload) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: mediaStreaming.getStream(),
      });

      peer.on("signal", (signal) => {
        socket.emit("returning signal", { signal, callerID: payload.callerID });
      });

      peer.signal(payload.signal);

      peersRef.current.push({
        peerID: payload.callerID,
        peer,
      });

      setPeers((users) => [...users, peer]);
    });

    socket.on("receiving returned signal", (payload) => {
      const item = peersRef.current.find((p) => p.peerID === payload.id);

      item.peer.signal(payload.signal);
    });
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
