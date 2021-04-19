import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

import SearchItem from "./SearchItem";

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

const SearchListWrapper = styled.div`
  position: absolute;
  top: 42px;
  margin: 0 20px;
  width: 80%;
`;

export default function InterviewerSearchField({ onSearchInputChange }) {
  const [inputValue, setInputValue] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);

  function handleInputChange(event) {
    const value = event.target.value;

    if (!value) {
      setSearchResultList([]);
      setInputValue("");
      return;
    }

    setInputValue(value);
    onSearchInputChange(value, viewSearchList);
  }

  function viewSearchList(searchList) {
    setSearchResultList(searchList);
  }

  return (
    <SearchBarWrapper>
      <Input value={inputValue} onChange={handleInputChange} />
      <FontAwesomeIcon icon={faSearch} />
      <SearchListWrapper>
        {searchResultList.map((searchItem) => <SearchItem key={searchItem.id} item={searchItem} />)}
      </SearchListWrapper>
    </SearchBarWrapper>
  );
}
