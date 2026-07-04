import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage, register } from "./api.js";
import { NotebookPen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card.js";
import { Button } from "@/components/ui/button.js";
import { Input } from "@/components/ui/input.js";
import { Label } from "@/components/ui/label.js";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    try {
      const message = await register({ username: username.trim(), password });
      setSuccess(message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      const message = getErrorMessage(err, "Error registering. Please try again.");
      setError(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <NotebookPen className="h-6 w-6" />
              <h3 className="text-xl font-bold">Notes</h3>
            </div>
          </CardTitle>
          <CardDescription>
             Create an account to start taking notes.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="pb-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:underline"
            >
              Already have an account?
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}