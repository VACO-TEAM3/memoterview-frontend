import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import { io } from "socket.io-client";

import Interview from "../pages/Interview";
import { mediaStream } from "../utils/media";

export default function InterviewPageContainer() {
  const socket = io.connect("http://localhost:5000");

  const { id: roomID } = useParams();
  const userData = Math.random(); // 리덕스와 연결되면 유저데이터로 받아야함
  const [isStreaming, setIsStreaming] = useState(false);
  const [peers, setPeers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [stream, setStream] = useState(null);
  const userVideo = useRef();
  const peersRef = useRef([]);

  useEffect(() => {
    (async function getStreaming() {
      try {
        const localStream = await mediaStream();

        userVideo.current.srcObject = localStream;
        
        setStream(localStream);
        setIsStreaming(true);
      } catch (error) {
        setErrorMessage(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    socket.emit("requestJoinRoom", { roomID, userData });

    socket.on("successJoinUser", (targetUsers) => {
      targetUsers.forEach((user) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
        });

        peer.on("signal", (signal) => {
          socket.emit("sendSignal", { callee: user.socketID, caller: socket.id, signal });
        });

        peersRef.current.push({
          peerID: user.socketID,
          peer,
        });

        setPeers((prev) => [...prev, peer]);
      });
    });

    socket.on("joinNewUser", ({ caller, signal }) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        console.log("I Got Signal");
        socket.emit("returnSignal", { signal, caller });
      });

      peer.signal(signal);

      peersRef.current.push({
        peerID: caller,
        peer,
      });

      setPeers((prev) => [...prev, peer]);
    });

    socket.on("receiveReturnSignal", ({ id, signal }) => {
      const { peer } = peersRef.current.find((p) => p.peerID === id);

      peer.signal(signal);
    });
  }, [isStreaming]);

  return (
    <Interview peers={peers} videoRef={userVideo} />
  );
}
