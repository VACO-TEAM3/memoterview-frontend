import { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

export default function Video({ peer }) {
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
    <StyledVideo playsInline autoPlay ref={ref} />
  );
}
