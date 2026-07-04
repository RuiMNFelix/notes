import { useState } from "react";
import { Link } from "react-router-dom";
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
import { getErrorMessage } from "@/shared/lib/get-error-message.js";

type AuthFormProps = {
  description: string;
  submitLabel: string;
  footerText: string;
  footerLinkTo: string;
  onSubmit: (data: {
    username: string;
    password: string;
  }) => Promise<string | void>;
};

export function AuthForm({
  description,
  submitLabel,
  footerText,
  footerLinkTo,
  onSubmit,
}: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }
    setLoading(true);

    try {
      const message = await onSubmit({ username: username.trim(), password });
      if (message) setSuccess(message);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Something went wrong. Please try again."));
    } finally {
      setLoading(false);
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
          <CardDescription>{description}</CardDescription>
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
            <Button type="submit" className="w-full" disabled={loading}>
              {submitLabel}
            </Button>
            <Link
              to={footerLinkTo}
              className="text-sm text-muted-foreground hover:underline"
            >
              {footerText}
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}