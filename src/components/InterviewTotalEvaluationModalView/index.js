import { useState } from "react"; 
import styled from "styled-components";

import ModalView from "../ModalView";
import RatingStars from "../RatingStars";

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function InterviewTotalEvaluationModalView({ filters }) {
  console.log(filters);
  const [filterRates, setFilterRates] = useState({});
  const [totalRate, setTotalRate] = useState(0);
  
  function handleStarRate(rateOption, value) {
    if (rateOption === "totalRate") {
      setTotalRate(value);

      return;
    }
    console.log(filterRates, totalRate);
    setFilterRates((prev) => ({ ...prev, [rateOption]: value }));
  }

  return (
    <ModalView padding="20px" width="500px" height="400px">
      <ViewWrapper>
        <input type="text" />
        <RatingStars onChange={handleStarRate} rateOption={"totalRate"} />
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
