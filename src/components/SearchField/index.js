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

export default function SearchField({ onSearchInputChange, onSelectSearchResult }) {
  // todo. state 하나로 합치기
  const [inputValue, setInputValue] = useState("");
  const [searchViewList, setSearchViewList] = useState([]);
  const [searchItemFocusIndex, setSearchItemFocusIndex] = useState(-1);

  function handleInputChange(event) {
    const value = event.target.value.trim();

    if (!value) {
      setSearchViewList([]);
      setInputValue("");
      return;
    }

    setInputValue(value);
    setSearchItemFocusIndex(0);
    onSearchInputChange(value, viewSearchList);
  }

  function handleKeyDown(event) {
    const key = event.key;
    const maximumIndex = searchViewList.length - 1;

    switch (key) {
      case "ArrowUp":
        event.preventDefault();
        const prevFocusIndex =
          searchItemFocusIndex > -1 ? searchItemFocusIndex - 1 : -1;

        setSearchItemFocusIndex(prevFocusIndex);
        break;

      case "ArrowDown":
        event.preventDefault();
        const nextFocusIndex =
          searchItemFocusIndex < maximumIndex
            ? searchItemFocusIndex + 1
            : maximumIndex;

        setSearchItemFocusIndex(nextFocusIndex);
        break;

      case "Enter":
        setInputValue("");
        setSearchItemFocusIndex(-1);
        setSearchViewList([]);
        onSelectSearchResult(searchViewList[searchItemFocusIndex]);
    }
  }

  function viewSearchList(searchList) {
    setSearchViewList(searchList);
  }

  return (
    <SearchBarWrapper>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <FontAwesomeIcon icon={faSearch} />
      <SearchList
        searchList={searchViewList}
        focusIndex={searchItemFocusIndex}
      />
    </SearchBarWrapper>
  );
}
