import styled from "styled-components";

const MainWrapper = styled.div`
  margin: 3% auto;
`;

export default function MainVideo({ videoRef }) {
  console.log(videoRef);
  return (
    <MainWrapper>
      <video ref={videoRef} autoPlay playsInline />
    </MainWrapper>
  );
}
