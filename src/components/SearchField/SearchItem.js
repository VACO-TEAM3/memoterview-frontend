import React from "react";
import styled from "styled-components";

const SearchItemWrapper = styled.li`
  padding: 3px 10px;
  width: 50%;
  border: .5px solid black;
  border-radius: 2px;
  font-size: .9rem;
  background-color: ${(props) => props.focus ? props.theme.Aero : "white"};
`;

export default function SearchItem({ text, focus, index, onClick, onMouseOver }) {
  function handleClick() {
    onClick(index);
  }

  function handleMouseOver() {
    onMouseOver(index);
  }

  return <SearchItemWrapper focus={focus} onClick={handleClick} onMouseOver={handleMouseOver}>{text}</SearchItemWrapper>;
}
