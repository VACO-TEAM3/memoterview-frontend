import { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledVideo = styled.video`
  width: 23%;
`;

export default function SubVideo({ peer }) {
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
