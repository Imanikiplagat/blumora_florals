import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {  Eye, EyeOff, Check, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { PASSWORD_REQUIREMENTS } from "@/lib/password-requirements";
import { isGoogleProviderEnabled } from "@/intergrations/supabase/client";
import { toast } from "sonner";

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    user,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const passwordChecks = useMemo(
    () =>
      PASSWORD_REQUIREMENTS.map((req) => ({
        ...req,
        valid: req.test(password),
      })),
    [password]
  );

  const passwordValid = passwordChecks.every((check) => check.valid);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signup") {
      if (!passwordValid) {
        toast.error("Please meet all password requirements.");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
    }

    setLoading(true);

    try {
      const res =
        mode === "signin"
          ? await signInWithEmail(email, password)
          : await signUpWithEmail(email, password, name);

      if (res.error) {
        toast.error(res.error);
        return;
      }

      if (mode === "signup") {
        toast.success(
          "Account created! Check your email if confirmation is required."
        );
      } else {
        toast.success("Welcome back!");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);

    try {
      const enabled = await isGoogleProviderEnabled();
      if (!enabled) {
        toast.error(
          "Google sign-in is disabled in Supabase. Configure Google under Authentication > Sign-in Providers."
        );
        return;
      }

      const res = await signInWithGoogle();

      if (res.error) {
        toast.error(
          res.error.toLowerCase().includes("provider is not enabled")
            ? "Google sign-in is not enabled in Supabase. Configure Google under Authentication > Sign-in Providers."
            : res.error
        );
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Google sign-in failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      {/* Logo / Header */}
      <div className="text-center">
      

        <h1 className="mt-4 font-display text-4xl text-[color:var(--burgundy)]">
          {mode === "signin"
            ? "Welcome back"
            : "Create your account"}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Sign in to track orders and manage saved bouquets."
            : "Join Blumora to save favorites and enjoy faster checkout."}
        </p>
      </div>

      {/* Sign In / Sign Up Toggle */}
      <div className="mt-8 flex rounded-full bg-[color:var(--blush)] p-1">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
            mode === "signin"
              ? "bg-[color:var(--burgundy)] text-white"
              : "text-foreground"
          }`}
        >
          Sign in
        </button>

        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
            mode === "signup"
              ? "bg-[color:var(--burgundy)] text-white"
              : "text-foreground"
          }`}
        >
          Sign up
        </button>
      </div>

      {/* Google */}
      <Button
        onClick={google}
        type="button"
        variant="outline"
        size="lg"
        disabled={loading}
        className="mt-6 w-full rounded-full border-[color:var(--burgundy)]/30 bg-white text-[color:var(--burgundy)] hover:bg-[color:var(--blush)]"
      >
        <svg
          className="mr-2 h-4 w-4"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>

        Continue with Google
      </Button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        <span>or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Form */}
      <form onSubmit={submit} className="space-y-4">
        {/* Name */}
        {mode === "signup" && (
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-2xl border border-border bg-card px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[color:var(--burgundy)] focus:ring-2 focus:ring-[color:var(--burgundy)]/20"
          />
        )}

        {/* Email */}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-2xl border border-border bg-card px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[color:var(--burgundy)] focus:ring-2 focus:ring-[color:var(--burgundy)]/20"
        />

        {/* Password */}
        <PasswordInput
          value={password}
          onChange={setPassword}
          show={showPassword}
          onToggle={() => setShowPassword((s) => !s)}
          placeholder="Password (min 8 characters)"
          minLength={8}
        />

        {/* Confirm Password */}
        {mode === "signup" && (
          <PasswordInput
            value={confirmPassword}
            onChange={setConfirmPassword}
            show={showConfirm}
            onToggle={() => setShowConfirm((s) => !s)}
            placeholder="Confirm password"
            minLength={8}
          />
        )}

        {/* Password Requirements */}
        {mode === "signup" && (
          <PasswordRequirements checks={passwordChecks} />
        )}

        {/* Forgot Password */}
        {mode === "signin" && (
          <div className="text-right text-xs">
            <Link
              to="/forgot-password"
              className="font-medium text-[color:var(--burgundy)] hover:text-[color:var(--rose)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className="w-full rounded-full bg-[color:var(--burgundy)] text-white hover:bg-[color:var(--rose)]"
        >
          {loading
            ? "Please wait…"
            : mode === "signin"
              ? "Sign in"
              : "Create account"}
        </Button>
      </form>

      {/* Switch Mode */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === "signin"
          ? "New to Blumora? "
          : "Already have an account? "}

        <button
          type="button"
          onClick={() =>
            setMode(mode === "signin" ? "signup" : "signin")
          }
          className="font-medium text-[color:var(--burgundy)] underline-offset-4 hover:text-[color:var(--rose)] hover:underline"
        >
          {mode === "signin"
            ? "Create an account"
            : "Sign in"}
        </button>
      </p>

      {/* Back Home */}
      <p className="mt-8 text-center text-xs text-muted-foreground">
        <Link
          to="/"
          className="text-[color:var(--burgundy)] hover:text-[color:var(--rose)] hover:underline"
        >
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  show,
  onToggle,
  placeholder,
  minLength = 6,
}: {
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  placeholder: string;
  minLength?: number;
}) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        required
        minLength={minLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-card px-5 py-3 pr-12 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[color:var(--burgundy)] focus:ring-2 focus:ring-[color:var(--burgundy)]/20"
      />

      <button
        type="button"
        onClick={onToggle}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-[color:var(--blush)] hover:text-[color:var(--burgundy)]"
      >
        {show ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

function PasswordRequirements({
  checks,
}: {
  checks: {
    id: string;
    label: string;
    valid: boolean;
  }[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-sm">
      <p className="mb-2 font-medium text-foreground">
        Password requirements
      </p>

      <ul className="space-y-2">
        {checks.map((check) => (
          <li
            key={check.id}
            className={`flex items-center gap-2 ${
              check.valid
                ? "text-green-600"
                : "text-muted-foreground"
            }`}
          >
            <span className="grid h-4 w-4 place-items-center">
              {check.valid ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
            </span>

            <span>{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthPage;