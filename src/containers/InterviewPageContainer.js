import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
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
  height: 40%;
  width: 50%;
`;

function Video({ peer }) {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <StyledVideo playsInline autoPlay ref={ref} />
  );
}

export default function InterviewPageContainer() {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomId = "hello";

  // const { localStream } = useUserMedia({ video: {
  //   height: window.innerHeight / 2,
  //   width: window.innerWidth / 2,
  // }, audio: true });

  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
  }).connect();

  useEffect(() => {
    let localStream;
    console.log(localStream);
    async function getLocalStream(constraints) {
      try {  
        localStream = await navigator.mediaDevices.getUserMedia(constraints);
        userVideo.current.srcObject = localStream;
      } catch (error) {
        console.error(error);
      }
    }

    getLocalStream({ video: {
      height: window.innerHeight / 2,
      width: window.innerWidth / 2,
    }, audio: true });

    socket.emit("join room", { room: roomId });
    socket.on("all users", (users) => {
      const peers = [];

      users.forEach(async (userId) => {
        const peer = await createPeer(userId, socket.id, localStream);

        peersRef.current.push({
          peerId: userId,
          peer,
        });

        peers.push(peer);
      });

      setPeers(peers);
    });

    socket.on("user joined", (payload) => {
      const peer = addPeer(payload.signal, payload.callerId, localStream);

      peersRef.current.push({
        peerId: payload.callerId,
        peer,
      });

      setPeers((users) => [...users, peer]);
    });

    socket.on("receiving returned signal", (payload) => {
      const item = peersRef.current.find((p) => p.peerId === payload.id);
      item.peer._debug = console.log;
      item.peer.signal(payload.signal);
    });

    function createPeer(userToSignal, callerId, stream) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });
  
      peer.on("signal", (signal) => {
        socket.emit("sending signal", { userToSignal, callerId, signal });
      });
  
      return peer;
    }

    function addPeer(incomingSignal, callerId, stream) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        socket.emit("returning signal", { signal, callerId });
      });

      peer.signal(incomingSignal);

      return peer;
    }
  }, []);
  
  return (
    <Container>
      <StyledVideo ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        return (
          <Video key={index} peer={peer} />
        );
      })}
    </Container>
  );
}

