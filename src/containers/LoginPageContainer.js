import { faKiss } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import { loginUser } from "../redux/reducers/user";

export default function LoginPageContainer() {
  const dispatch = useDispatch();
  const { token } = useSelector(({ user }) => ({
    token: user.token,
  }));

  function onSuccess(data) {
    const { profileObj } = data;

    dispatch(loginUser(profileObj));
  }

  function onFailure(error) {
    console.log(error);
    alert("fail!");
  }
  return (
    <>
      <LoginPage onSuccess={onSuccess} onFailure={onFailure} />
      {token && <Redirect to="/projects" />}
    </>
  );
}
