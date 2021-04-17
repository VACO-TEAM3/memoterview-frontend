import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Input = styled.input`
  margin: 5px 20px;
  width: 80%;
  height: 30px;
  font-size: 1rem;
`;

const PlusButton = styled.span`
  font-size: 1.2rem;
  cursor: pointer;
`;

export default function ProjectEvaluationOptionAddBar({ onEvaluationOptionAdd }) {
  const [inputValue, setInputValue] = useState("");

  function handleInputValueChange(e) {
    setInputValue(e.target.value);
  }

  function handleInputValueAddBtnClick() {
    onEvaluationOptionAdd(inputValue);
  }

  return (
    <Wrapper>
      <Input value={inputValue} onChange={handleInputValueChange}/>
      <PlusButton onClick={handleInputValueAddBtnClick}>
        <FontAwesomeIcon icon={faPlus}/>
      </PlusButton>
    </Wrapper>
  );
}
