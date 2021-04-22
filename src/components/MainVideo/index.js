import styled from "styled-components";

const MainWrapper = styled.div`
  video {
    display: flex;
    justify-content: center;
    width: 85%;
    margin: auto;
  }
`;

export default function MainVideo({ videoRef }) {
  return (
    <MainWrapper>
      <video ref={videoRef} autoPlay playsInline />
    </MainWrapper>
  );
}
