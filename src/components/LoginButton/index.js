import GoogleLogin from "react-google-login";

export default function LoginButton({ onSuccess, onFailure, customStyle }) {
  console.log("LoginButton");
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_SECRET);

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Log in with Google"
      render={customStyle}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}
