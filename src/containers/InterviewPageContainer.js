import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import styled from "styled-components";

import useUserMedia from "../hooks/useUserMedia";

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 100px;
  width: 200px;
`;

function Video({ peer }) {
  const ref = useRef();

  useEffect(() => {
    if (!peer) {
      return;
    }

    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <video playsInline autoPlay ref={ref} />
  );
}

export default function InterviewPageContainer() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const peerList = [];
  const roomID = "happy";
  const socket = io.connect("http://localhost:5000");
  const { localStream } = useUserMedia({ video: true, audio: true });

  useEffect(() => {
    socket.emit("join room", roomID);
    socket.on("all users", (users) => {
      users.forEach((userID) => {
        const peer = createPeer(userID, socket.id, localStream);

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
        socket.emit("sending signal", { userToSignal, callerID, signal });
      });

      return peer;
    }

    setPeers(peerList);
    setIsStreaming(true);
  }, []);

  useEffect(() => {
    if (!isStreaming || !localStream) {
      return;
    }

    userVideo.current.srcObject = localStream;

    socket.on("user joined", (payload) => {
      const peer = addPeer(payload.signal, payload.callerID, localStream);

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

    function addPeer(incomingSignal, callerID, stream) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        socket.emit("returning signal", { signal, callerID });
      });

      peer.signal(incomingSignal);

      return peer;
    }
  }, [isStreaming]);

  return (
    <Container>
      <video ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        return (
          <Video key={index} peer={peer} />
        );
      })}
    </Container>
  );
}
