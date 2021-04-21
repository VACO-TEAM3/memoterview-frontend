import styled from "styled-components";

const MainWrapper = styled.div`
  width: 640px;
  height: 480px;
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
