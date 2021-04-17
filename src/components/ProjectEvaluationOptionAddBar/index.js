import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Input = styled.input`
  margin: 5px 20px;
  padding: 3px 10px 0;
  width: 80%;
  height: 30px;
  font-size: 1rem;
`;

const PlusButton = styled.span`
  font-size: 1.2rem;
  cursor: pointer;
`;

export default function ProjectEvaluationOptionAddBar({ enalbe, onEvaluationOptionAdd }) {
  const [inputValue, setInputValue] = useState("");

  function handleInputValueChange(e) {
    setInputValue(e.target.value);
  }

  function addInputValue() {
    if (inputValue) {
      onEvaluationOptionAdd(inputValue);
      setInputValue("");
    }
  }

  function handleInputValueAddBtnClick() {
    addInputValue();
  }

  function handleInputValueKeyDown(e) {
    if (e.key === "Enter") {
      addInputValue();
    }
  }

  return (
    <Wrapper>
      <Input value={inputValue} onChange={handleInputValueChange} onKeyDown={handleInputValueKeyDown}/>
      <PlusButton onClick={handleInputValueAddBtnClick}>
        <FontAwesomeIcon icon={faPlus}/>
      </PlusButton>
    </Wrapper>
  );
}
