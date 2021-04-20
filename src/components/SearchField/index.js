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

const initialState = {
  inputValue: "",
  searchViewList: [],
  searchItemFocusIndex: -1,
};

export default function SearchField({ onSearchInputChange, onSelectSearchResult }) {
  const [state, setState] = useState(initialState);

  function handleInputChange(event) {
    const inputValue = event.target.value.trim();

    if (!inputValue) {
      return setState(initialState);
    }

    setState({
      ...state,
      inputValue,
      searchItemFocusIndex: 0,
    });

    onSearchInputChange(inputValue, viewSearchList);
  }

  function handleKeyDown(event) {
    const key = event.key;
    const currentFocusIndex = state.searchItemFocusIndex;
    const maximumIndex = state.searchViewList.length - 1;

    switch (key) {
      case "ArrowUp":
        event.preventDefault();
        const prevFocusIndex =
        currentFocusIndex > -1 ? currentFocusIndex - 1 : -1;

        return setState({
          ...state,
          searchItemFocusIndex: prevFocusIndex,
        });

      case "ArrowDown":
        event.preventDefault();
        const nextFocusIndex =
          currentFocusIndex < maximumIndex
            ? currentFocusIndex + 1
            : maximumIndex;

        return setState({
          ...state,
          searchItemFocusIndex: nextFocusIndex,
        });

      case "Enter":
        setState(initialState);
        onSelectSearchResult(state.searchViewList[currentFocusIndex]);
    }
  }

  function viewSearchList(searchViewList) {
    setState({
      ...state,
      searchViewList,
    });
  }

  return (
    <SearchBarWrapper>
      <Input
        value={state.inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <FontAwesomeIcon icon={faSearch} />
      <SearchList
        searchList={state.searchViewList}
        focusIndex={state.searchItemFocusIndex}
      />
    </SearchBarWrapper>
  );
}
