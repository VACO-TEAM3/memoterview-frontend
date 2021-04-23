import styled from "styled-components";

import StyledVideo from "../shared/StyledVideo";

export default function MainVideo({ videoRef }) {
  return (
    <StyledVideo ref={videoRef} autoPlay playsInline />
  );
}
