import { useState } from "react";

export default function useToken() {
  const [token, setToken] = useState(getToken());

  function getToken() {
    const tokenString = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(tokenString);

    return accessToken;
  }

  function saveToken(accessToken) {
    localStorage.setItem("accessToken", JSON.stringify(accessToken));

    setToken(accessToken);
  }

  return {
    setToken: saveToken,
    token,
  };
}
