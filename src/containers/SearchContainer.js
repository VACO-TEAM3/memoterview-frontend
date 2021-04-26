import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { searchQuestionsAPI } from "../api";
import useToken  from "../hooks/useToken";
import Search from "../pages/Search";

export default function SearchContainer() {
  const { token } = useToken();
  const { projectId } = useParams();

  const [inputText, setInputText] = useState("");
  const [searchList, setSearchList] = useState([]);

  function handleInputChange(e) {
    e.preventDefault();
    const { value } = e.target;

    setInputText(value);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const searchList = await searchQuestionsAPI({ token, inputText, projectId });

    setSearchList(searchList);
    setInputText("");
  }

  return (
    <>
      <Search
        searchList={searchList}
        inputText={inputText}
        onFormSubmit={handleFormSubmit}
        onInputChange={handleInputChange}/>
    </>
  );
}
