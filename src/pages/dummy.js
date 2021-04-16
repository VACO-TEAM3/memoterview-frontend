import React from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../redux/reducers/user";

export default function Dummy() {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(loginUser({
      email: "hayeong28@naver.com",
      imgURL: "dfdsfasf",
      name: "최하영",
    }));
  }

  return <button onClick={handleClick}>hello friend</button>;
}
