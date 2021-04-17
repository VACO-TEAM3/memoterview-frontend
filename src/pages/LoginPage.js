import LoginButton from "../components/LoginButton";

export default function LoginPage({ onSuccess, onFailure }) {  
  return (
    <LoginButton onSuccess={onSuccess} onFailure={onFailure} />
  );
}
