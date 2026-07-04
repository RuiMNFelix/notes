import { useNavigate } from "react-router-dom";
import { AuthForm } from "./auth-form";
import { login } from "./api";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (data: { username: string; password: string }) => {
    const token = await login(data);
    localStorage.setItem("token", token);
    navigate("/notes");
  };

  return (
    <AuthForm
      description="Welcome back! Please sign in to continue."
      submitLabel="Sign In"
      footerText="Don't have an account?"
      footerLinkTo="/register"
      onSubmit={handleLogin}
    />
  );
}
