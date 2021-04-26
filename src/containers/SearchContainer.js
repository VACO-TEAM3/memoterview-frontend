import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { searchQuestionsAPI } from "../api";
import useToken  from "../hooks/useToken";
import Search from "../pages/Search";
import { setUser } from "../redux/reducers/user";

export default function SearchContainer() {
  const dispatch = useDispatch();
  const { token } = useToken();
  const { projectId } = useParams();

  const [inputText, setInputText] = useState("");
  const [searchList, setSearchList] = useState([]);

  function handleInputChange(e) {
    e.preventDefault();
    const { value } = e.target;

    setInputText(value);
    console.log(inputText, "text");
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const searchList = await searchQuestionsAPI({ token, inputText, projectId });
    
    console.log(searchList, "list?");

    setSearchList(searchList);
    setInputText("");
  }

  console.log(searchList, "from outside");

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
