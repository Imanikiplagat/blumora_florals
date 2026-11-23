import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await requestPasswordReset(email);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setSent(true);
      toast.success("If an account exists for that email, a reset link is on its way.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not request a password reset."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-center text-4xl text-olive">
        Reset your password
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Enter your account email and we will send you a password reset link.
      </p>

      {sent ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-center text-sm text-espresso">
          If an account exists for <strong>{email}</strong>, you will receive a
          reset link.
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-4 block w-full font-medium text-deep-rose hover:underline"
          >
            Try another email
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-4">
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-2xl border border-border bg-card px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-rose focus:ring-2 focus:ring-rose/20"
          />
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full rounded-full bg-olive text-white hover:bg-deep-olive"
          >
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      )}

      <Link
        to="/auth"
        className="mt-8 text-center text-sm font-medium text-deep-rose hover:underline"
      >
        Back to sign in
      </Link>
    </div>
  );
}
