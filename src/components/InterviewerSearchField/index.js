import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

import SearchList from "./SearchList";


const SearchBarWrapper = styled.div`
  position: relative;
  svg {
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
  margin: 5px 20px;
  padding: 3px 10px 0;
  width: 80%;
  height: 30px;
  font-size: 1rem;
`;


export default function InterviewerSearchField({ onSearchInputChange }) {
  const [inputValue, setInputValue] = useState("");
  const [searchViewList, setSearchViewList] = useState([]);

  function handleInputChange(event) {
    const value = event.target.value.trim();

    if (!value) {
      setSearchViewList([]);
      setInputValue("");
      return;
    }

    setInputValue(value);
    onSearchInputChange(value, viewSearchList);
  }

  function viewSearchList(searchList) {
    setSearchViewList(searchList);
  }

  return (
    <SearchBarWrapper>
      <Input value={inputValue} onChange={handleInputChange} />
      <FontAwesomeIcon icon={faSearch} />
      <SearchList searchList={searchViewList} />
    </SearchBarWrapper>
  );
}
