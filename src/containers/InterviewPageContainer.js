import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import { io } from "socket.io-client";

import Video from "../components/Video";
import { mediaStreaming } from "../utils/media";

export default function InterviewPageContainer() {
  const socket = io.connect("http://localhost:5000");

  const { id } = useParams();
  const [isStreaming, setIsStreaming] = useState(false);
  const [peers, setPeers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const userVideo = useRef();
  const peersRef = useRef([]);
  const peerList = [];

  useEffect(() => {
    // 리덕스에서 받아온 is opened가 FALSE일 경우
    // socket.emit("createRoom", ({ creatorID, intervieweeID, id }));
    socket.emit("requestJoin", id, async (error) => {
      if (error) {
        setErrorMessage(error);
      }

      const stream = await mediaStreaming.Initialize();
      userVideo.current.srcObject = stream;

      setIsStreaming(true);
    });

    // return () => {
    //   socket.emit("leaveRoom");
    // };
  }, []);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }
    console.log(25);
    socket.on("successJoin", (members) => {
      console.log(members);
      members.forEach((memberID) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: mediaStreaming.getStream(),
        });
  
        peer.on("signal", (signal) => {
          socket.emit("sendingSignal", { calleeID: memberID, callerID: socket.id, signal });
        });
  
        peersRef.current.push({
          peerID: memberID,
          peer,
        });
  
        peerList.push(peer);
      });
  
      setPeers(peerList);
    });
    
    socket.on("sendingForUsers", ({ signal, callerID }) => {
      console.log(signal);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: mediaStreaming.getStream(),
      });

      peer.on("signal", (signal) => {
        console.log("signal", callerID);
        socket.emit("returningSignal", { signal, callerID });
      });

      peer.signal(signal);

      peersRef.current.push({
        peerID: callerID,
        peer,
      });

      setPeers((users) => [...users, peer]);
    });

    socket.on("receivingReturnedSignal", ({ signal, calleeID }) => {
      console.log("receiving", calleeID);
      const item = peersRef.current.find((p) => p.peerID === calleeID);
      console.log(item);
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
