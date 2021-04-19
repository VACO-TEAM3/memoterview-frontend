import React from "react";
import styled from "styled-components";

const SearchItemWrapper = styled.div`
  padding: 3px 10px;
  width: 50%;
  border: .5px solid black;
  border-radius: 2px;
  font-size: .9rem;
`;

export default function SearchItem({ item }) {
  return <SearchItemWrapper>{item.name}</SearchItemWrapper>;
}
