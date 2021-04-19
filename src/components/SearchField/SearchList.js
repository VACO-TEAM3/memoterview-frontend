import React from "react";
import styled from "styled-components";

import SearchItem from "./SearchItem";

const SearchListWrapper = styled.ul`
  position: absolute;
  top: 42px;
  margin: 0 20px;
  padding: 0;
  width: 80%;
  list-style-type: none;
`;

export default function SearchList({ searchList, focusIndex }) {
  return (
    focusIndex !== -1 && (
      <SearchListWrapper>
        {searchList.map((searchItem, index) => (
          <SearchItem
            key={searchItem.id}
            text={searchItem.name}
            focus={index === focusIndex}
          />
        ))}
      </SearchListWrapper>
    )
  );
}
