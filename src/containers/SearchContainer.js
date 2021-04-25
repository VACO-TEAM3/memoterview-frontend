import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { searchQuestions } from "../api";
import useToken  from "../hooks/useToken";
import Search from "../pages/Search";
import { setUser } from "../redux/reducers/user";

export default function SearchContainer() {
  const dispatch = useDispatch();
  const { token } = useToken();
  const { projectId } = useParams();

  const [inputText, setInputText] = useState("");
  const [questionList, setQuestionList] = useState([]);

  function handleInputChange(e) {
    e.preventDefault();
    const { value } = e.target;

    setInputText(value);
    console.log(inputText, "text");
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const questions = await searchQuestions({ token, inputText, projectId });

    setQuestionList(questions);
    setInputText("");
  }

  console.log(questionList, "from outside");

  return (
    <>
      <Search
        questionList={questionList}
        inputText={inputText}
        onFormSubmit={handleFormSubmit}
        onInputChange={handleInputChange}/>
    </>
  );
}
