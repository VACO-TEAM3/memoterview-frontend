import React, { useState } from "react";
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

export default function SearchList({ searchList }) {
  const [searchItemFocusIndex, setSearchItemFocusIndex] = useState(-1);

  return (
    <SearchListWrapper>
      {searchList.map((searchItem, index) => (
        <SearchItem
          key={searchItem.id}
          text={searchItem.name}
          focus={index === searchItemFocusIndex}
        />
      ))}
    </SearchListWrapper>
  );
}
