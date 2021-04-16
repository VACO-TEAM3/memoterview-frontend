import { useState } from "react";

export default function useToken() {
  const [token, setToken] = useState(getToken());

  function getToken() {
    const tokenString = localStorage.getItem("accessToken");
    const userToken = JSON.parse(tokenString);

    return userToken;
  }

  function saveToken(userToken) {
    localStorage.setItem("accessToken", JSON.stringify(userToken));

    setToken(userToken);
  }

  return {
    setToken: saveToken,
    token,
  };
}
