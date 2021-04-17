import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import { loginUser } from "../redux/reducers/user";

export default function LoginPageContainer() {
  const dispatch = useDispatch();
  const history = useHistory();

  function onSuccess(data) {
    const { profileObj } = data;

    dispatch(loginUser(profileObj));
    history.push("/");
  }
  
  function onFailure() {
    alert("fail!");
    history.push("/login");
  }

  return (
    <LoginPage onSuccess={onSuccess} onFailure={onFailure} />
  );
}
