import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

import useSearchField from "../../hooks/useSearchField";
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
  const { searchState, handleInputChange, handleKeyDown } = useSearchField({ onSearchInputChange, onSelectSearchResult });

  return (
    <SearchBarWrapper>
      <Input
        value={searchState.inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <FontAwesomeIcon icon={faSearch} />
      {searchState.inputValue && <SearchList
        searchList={searchState.searchViewList}
        focusIndex={searchState.searchItemFocusIndex}
      />}
    </SearchBarWrapper>
  );
}
