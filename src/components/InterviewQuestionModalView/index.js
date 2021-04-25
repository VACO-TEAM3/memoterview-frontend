import styled from "styled-components";

import ModalView from "../ModalView";
import RatingStars from "../RatingStars";

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function InterviewQuestionModalView({ 
  filters, 
  onCommentChange, 
  onRateChange, 
  onFilterRateChange, 
  onResultSubmit,
}) {
  return (
    <ModalView padding="20px" width="500px" height="200px">
      <ViewWrapper>
        <h2>답변 평가</h2>
        <form onSubmit={onResultSubmit}>
          <RatingStars onChange={onRateChange} />
          <button className="interview-input" type="submit">OK</button>
        </form>
      </ViewWrapper>
    </ModalView>
  );
}
