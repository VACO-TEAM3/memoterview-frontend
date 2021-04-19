import React from "react";
import styled from "styled-components";

const SearchItemWrapper = styled.li`
  padding: 3px 10px;
  width: 50%;
  border: .5px solid black;
  border-radius: 2px;
  font-size: .9rem;
  background-color: ${(props) => props.focus ? props.theme.Aero : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme.Aero};
  }
`;

export default function SearchItem({ text, focus }) {
  return <SearchItemWrapper focus={focus}>{text}</SearchItemWrapper>;
}
