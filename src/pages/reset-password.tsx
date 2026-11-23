import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { PASSWORD_REQUIREMENTS } from "@/lib/password-requirements";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const { session, loading: authLoading, updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checks = useMemo(
    () =>
      PASSWORD_REQUIREMENTS.map((requirement) => ({
        ...requirement,
        valid: requirement.test(password),
      })),
    [password]
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checks.every((check) => check.valid)) {
      toast.error("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await updatePassword(password);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Your password has been updated.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update your password."
      );
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-8rem)] place-items-center text-muted-foreground">
        Verifying reset link...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-4xl text-olive">
          Reset link expired
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Request a new password reset link to continue.
        </p>
        <Button
          asChild
          className="mt-6 rounded-full bg-olive text-white hover:bg-deep-olive"
        >
          <Link to="/forgot-password">Request another link</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-center text-4xl text-olive">
        Choose a new password
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Your new password must meet each requirement below.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="New password"
          className="w-full rounded-2xl border border-border bg-card px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-rose focus:ring-2 focus:ring-rose/20"
        />
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm new password"
          className="w-full rounded-2xl border border-border bg-card px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-rose focus:ring-2 focus:ring-rose/20"
        />

        <ul className="rounded-2xl border border-border bg-card p-4 text-sm">
          {checks.map((check) => (
            <li
              key={check.id}
              className={`flex items-center gap-2 py-1 ${
                check.valid ? "text-green-700" : "text-muted-foreground"
              }`}
            >
              {check.valid ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <X className="h-4 w-4" aria-hidden="true" />
              )}
              {check.label}
            </li>
          ))}
        </ul>

        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className="w-full rounded-full bg-olive text-white hover:bg-deep-olive"
        >
          {loading ? "Updating..." : "Update password"}
        </Button>
      </form>
    </div>
  );
}
