import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import { io } from "socket.io-client";

import Video from "../components/Video";
import { mediaStreaming } from "../utils/media";

export default function InterviewPageContainer() {
  const { id } = useParams();
  const [isStreaming, setIsStreaming] = useState(false);
  const [peers, setPeers] = useState([]);
  const [members, setMembers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const peerList = [];
  const socket = io.connect("http://localhost:5000");

  useEffect(() => {
    // 리덕스에서 받아온 is opened가 FALSE일 경우
    // socket.emit("createRoom", ({ creatorID, intervieweeID, id }));
    socket.emit("requestJoin", id, async () => {
      const stream = await mediaStreaming.Initialize();
      userVideo.current.srcObject = stream;

      setIsStreaming(true);
    });

    socket.on("successJoin", (users) => {
      setMembers(users);
    });

    return () => {
      socket.emit("leaveRoom");
    };
  }, []);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    members.forEach((userID) => {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: mediaStreaming.getStream(),
      });

      peer.on("signal", (signal) => {
        socket.emit("sendingSignal", { callee: userID, callerID: socket.id, signal });
      });

      peersRef.current.push({
        peerID: userID,
        peer,
      });

      peerList.push(peer);
    });

    setPeers(peerList);

    socket.on("sendingForUsers", ({ signal, callerID }) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: mediaStreaming.getStream(),
      });

      peer.signal(signal);

      peer.on("signal", (signal) => {
        socket.emit("returningSignal", { signal, callerID });
      });

      peersRef.current.push({
        peerID: callerID,
        peer,
      });

      setPeers((users) => [...users, peer]);
    });

    socket.on("receivingReturnedSignal", ({ signal, calleeID }) => {
      const item = peersRef.current.find((p) => p.peerID === calleeID);

      item.peer.signal(signal);
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
