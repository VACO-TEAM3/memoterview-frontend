import React from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;

  background-color: rgba(255, 255, 255, 0);
`;

function Loading() {
  return (
    <LoadingWrapper>
      <video
        src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/employee-review-3575379-3004512.mp4"
        autoPlay="autoplay"
        muted="muted"
        loop="loop"
        playsInline=""
        type="video/mp4"
        width="350px"
        height="350px"
      ></video>
    </LoadingWrapper>
  );
}

export default Loading;
