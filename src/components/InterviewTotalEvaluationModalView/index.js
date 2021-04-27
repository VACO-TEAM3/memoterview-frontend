import styled from "styled-components";

import ModalView from "../ModalView";
import RatingStars from "../RatingStars";

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.InterviewModalContent};
`;

const FilterOptions = styled.div`
  display: grid;
  grid-template-columns: 37% auto;
  margin-top: 0.5rem;
`;

const TotalOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;

  .interview-input {
    width: 60%;
    height: 20px;
    margin: 0.5rem auto;
    border: 1px solid ${({ theme }) => theme.InterviewModalBorder};
  }

  ::before {
    display: block;
    margin: auto;
    width: 80%;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.InterviewModalBorder};
    content: "";
  }
`;

const ButtonWrapper = styled.button`
  position: fixed;
  width: 100%;
  height: 3rem;
  top: 90.5%;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.InterviewModalBorder};
  background: ${({ theme }) => theme.BabyPowder};
  color: ${({ theme }) => theme.LittleBoyBlue};

  :hover {
    color: ${({ theme }) => theme.BabyPowder};
    background: ${({ theme }) => theme.LittleBoyBlue};
  }
`;

export default function InterviewTotalEvaluationModalView({
  filters,
  onCommentChange,
  onTotalRateChange,
  onFilterRateChange,
  onResultSubmit,
}) {
  return ( //baby power 색상
    <ModalView backgroundColor="#f9f8f5" width="500px" height="500px">
      <ViewWrapper>
        <h2>최종 평가</h2>
        <form onSubmit={onResultSubmit}>
          {filters?.map((filter, index) => (
            <FilterOptions key={index}>
              <h3>{filter}</h3>
              <RatingStars onChange={onFilterRateChange} rateOption={filter} />
            </FilterOptions>
          ))}
          <TotalOptions>
            <h3 className="interview-total-result">종합 점수</h3>
            <input className="interview-input" type="text" onChange={onCommentChange} />
            <RatingStars onChange={onTotalRateChange} />
            <ButtonWrapper type="submit">OK</ButtonWrapper>
          </TotalOptions>    
        </form>
      </ViewWrapper>
    </ModalView>
  );
}
