import styled from "styled-components";

import ModalView from "../ModalView";
import RatingStars from "../RatingStars";

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function InterviewTotalEvaluationModalView() {
  return (
    <ModalView padding="20px" width="500px" height="400px">
      <ViewWrapper>
        <input type="text" />
        <RatingStars />
      </ViewWrapper>
    </ModalView>
  );
}
