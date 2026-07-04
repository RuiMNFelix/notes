import { useNavigate } from "react-router-dom";
import { AuthForm } from "../auth-form";
import { login } from "../api";
import { setToken } from "@/shared/lib/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (data: { username: string; password: string }) => {
    const token = await login(data);
    setToken(token);
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
