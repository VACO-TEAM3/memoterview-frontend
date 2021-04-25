import { useState } from "react"; 
import styled from "styled-components";

import ModalView from "../ModalView";
import RatingStars from "../RatingStars";

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function InterviewTotalEvaluationModalView({ filters }) {
  const [totalRate, setTotalRate] = useState(0);
  const [filterRates, setFilterRates] = useState([]);
  
  function handleStarRate(value, rateOption) {
    if (rateOption) {
      setFilterRates((prev) => [...prev, { rateOption: value }]);

      return;
    }

    setTotalRate(value);
  }

  return (
    <ModalView padding="20px" width="500px" height="400px">
      <ViewWrapper>
        <input type="text" />
        <RatingStars onChange={handleStarRate} />
        {filters?.map((filter) => (
          <div className="filter-options">
            <div>{filter}</div>
            <RatingStars onChange={handleStarRate} rateOption={filter} />
          </div>
        ))}
      </ViewWrapper>
    </ModalView>
  );
}
