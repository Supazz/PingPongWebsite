import { useState } from "react";
import type { LoginRequest } from "../auth/login.model";
import { login } from "../auth/login.service";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth } from "../auth/useAuth";
export function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isFormComplete = Boolean(username.trim() && password.length > 0);
  const navigate = useNavigate();
  const {refreshUser} = useAuth();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Login</h1>
      <p className="mb-8 text-muted-foreground">Sign in to your account.</p>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!isFormComplete || isSubmitting) {
            return;
          }
          const request: LoginRequest = {
            username: username.trim(),
            password: password,
          };

          setErrorMessage("");
          setIsSubmitting(true);

          try {
            await login(request);
            await refreshUser();
            navigate("/admin");
          } catch (error) {
            setErrorMessage(
              error instanceof Error ? error.message : "Unable to sign in.",
            );
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="w-full max-w-md space-y-5 rounded-xl border bg-card p-6 shadow-sm"
        aria-busy={isSubmitting}
      >
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            autoComplete="username"
            disabled={isSubmitting}
            required
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            disabled={isSubmitting}
            required
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {errorMessage && (
          <p role="alert" className="text-sm text-destructive">
            {errorMessage}
          </p>
        )}
        <Button
          className="w-full"
          type="submit"
          disabled={!isFormComplete || isSubmitting}
        >
          {isSubmitting ? "Signing in…" : "Login"}
        </Button>
      </form>
      <Link to="/" className={buttonVariants({ variant: "outline", className: "mt-6" })}>
        Back to rankings
      </Link>
    </main>
  );
}
