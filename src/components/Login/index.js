import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";

import { login } from "../../api";

export default function Login() {
  const history = useHistory();

  async function onSuccess(data) {
    const { profileObj } = data;

    await login(profileObj);

    history.push("/");
  }

  function onFailure() {
    alert("fail!");
    history.push("/login");
  }

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Log in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}
