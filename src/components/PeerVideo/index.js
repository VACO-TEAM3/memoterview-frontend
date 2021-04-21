import { useEffect, useRef } from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  margin: 3% auto;
`;

export default function PeerVideo({ peer }) {
  const videoRef = useRef();

  useEffect(() => {
    if (!peer) {
      return;
    }

    peer.on("stream", (stream) => {
      videoRef.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <MainWrapper>
      <video ref={videoRef} autoPlay playsInline  />
    </MainWrapper>
  );
}
