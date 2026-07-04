import { useNavigate } from "react-router-dom";
import { AuthForm } from "./auth-form.js";
import { register } from "./api.js";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (data: { username: string; password: string;}) => {
    const message = await register(data);
    setTimeout(() => navigate("/login"), 2000);
    return message;
  };

  return (
    <AuthForm
      description="Create an account to start taking notes."
      submitLabel="Sign Up"
      footerText="Already have an account?"
      footerLinkTo="/login"
      onSubmit={handleRegister}
    />
  );
}