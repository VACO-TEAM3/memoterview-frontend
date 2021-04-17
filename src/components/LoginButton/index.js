import GoogleLogin from "react-google-login";

export default function LoginButton({ onSuccess, onFailure }) {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Log in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}
