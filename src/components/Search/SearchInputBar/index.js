import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const SearchInputBox = styled.form`
display: flex;
justify-content: center;
align-items: center;
width: 30%;
height: 20%;
margin-top: 5vh;
border: 1px solid rgba(0, 0, 0, 0.2);
border-radius: 20px;
font-size: ${props => props.iconSize};
`;

const SearchInput = styled.input`
width: 80%;
height: 70%;
margin: 1vw;
border: none;
outline: none;
font-size: 20px;
`;

export default function SearchInputBar({ inputText, onFormSubmit, onInputChange }) {
 
  return (
    <SearchInputBox onSubmit={onFormSubmit}>
      <FontAwesomeIcon icon={faSearch}/>
      <SearchInput value={inputText} onChange={onInputChange} />
    </SearchInputBox>
  );
}

// SearchInputBar.defaultProps = {
//   iconSize: "20px",
// };

