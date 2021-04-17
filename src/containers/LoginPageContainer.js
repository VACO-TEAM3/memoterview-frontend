import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import { loginUser } from "../redux/reducers/user";

export default function LoginPageContainer() {
  const dispatch = useDispatch();
  const { token } = useSelector(({ user }) => ({
    token: user,
  }));
  const history = useHistory();
  console.log(token);
  function onSuccess(data) {
    const { profileObj } = data;

    localStorage.setItem("accessToken", token);
    dispatch(loginUser(profileObj));
    history.push("/");
  }

  function onFailure() {
    alert("fail!");
    history.push("/login");
  }
  console.log(token);
  return (
    <LoginPage onSuccess={onSuccess} onFailure={onFailure} />
  );
}
