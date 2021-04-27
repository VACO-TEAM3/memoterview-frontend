import styled from "styled-components";

import ModalView from "../ModalView";
import RatingStars from "../RatingStars";

const ViewWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin: 0;
  padding: 0;
  text-align: center;
  border-radius: 10%;
  color: ${({ theme }) => theme.InterviewModalContent};
`;

const ViewContent = styled.div`
  margin-top: 2.2rem;
`;

const InputButton = styled.button`
  width: 100%;
  height: 2.8rem;
  background: ${({ theme }) => theme.BabyPowder};
  margin-top: 2.45rem;
  color: ${({ theme }) => theme.LittleBoyBlue};
  border-radius: 0 0 3% 3%;
  border: 0;
  border-top: 1.5px solid ${({ theme }) => theme.InterviewModalBorder};

  :hover {
    color: ${({ theme }) => theme.BabyPowder};
    background: ${({ theme }) => theme.LittleBoyBlue};
  }
`;

export default function InterviewQuestionModalView({
  onRateChange,
  onResultSubmit,
}) {
  return (
    <ViewWrapper>
      <ModalView width="400px" height="200px" backgroundColor="#f9f8f5">
        <h3>답변 평가</h3>
        <form onSubmit={onResultSubmit}>
          <ViewContent>
            <RatingStars onChange={onRateChange} />
          </ViewContent>
          <InputButton type="submit">OK</InputButton>
        </form>
      </ModalView>
    </ViewWrapper>
  );
}
