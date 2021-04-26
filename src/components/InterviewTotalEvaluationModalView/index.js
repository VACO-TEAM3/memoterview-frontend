import styled from "styled-components";

import ModalView from "../ModalView";
import RatingStars from "../RatingStars";

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function InterviewTotalEvaluationModalView({ 
  filters, 
  onCommentChange, 
  onTotalRateChange, 
  onFilterRateChange, 
  onResultSubmit,
}) {
  console.log(filters);
  return (
    <ModalView padding="20px" width="500px" height="600px">
      <ViewWrapper>
        <h2>최종 평가</h2>
        <form onSubmit={onResultSubmit}>
          {filters?.map((filter, index) => (
            <div className="interview-filter-options" key={index}>
              <div>{filter}</div>
              <RatingStars onChange={onFilterRateChange} rateOption={filter} />
            </div>
          ))}
          <input className="interview-input" type="text" onChange={onCommentChange} />
          <RatingStars onChange={onTotalRateChange} />
          <button className="interview-input" type="submit">OK</button>
        </form>
      </ViewWrapper>
    </ModalView>
  );
}
