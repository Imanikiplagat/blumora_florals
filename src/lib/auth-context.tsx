import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/intergrations/supabase/client";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  role: "admin" | "customer" | null;
  loading: boolean;
  roleLoading: boolean;

  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<{ error?: string }>;

  signUpWithEmail: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error?: string }>;

  signInWithGoogle: () => Promise<{ error?: string }>;

  requestPasswordReset: (email: string) => Promise<{ error?: string }>;

  updatePassword: (password: string) => Promise<{ error?: string }>;

  signOut: () => Promise<{ error?: string }>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<"admin" | "customer" | null>(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setRoleLoading(true);

        setTimeout(() => {
          fetchRole(session.user.id);
        }, 0);
      } else {
        setRole(null);
        setRoleLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);

      if (data.session?.user) {
        setRoleLoading(true);

        fetchRole(data.session.user.id).finally(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchRole(userId: string) {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching user role:", error);
      setRole("customer");
      setRoleLoading(false);
      return;
    }

    if (data && data.length > 0) {
      const isAdmin = data.some((r) => r.role === "admin");

      setRole(isAdmin ? "admin" : "customer");
    } else {
      setRole("customer");
    }

    setRoleLoading(false);
  }

  const signInWithEmail: AuthCtx["signInWithEmail"] = async (
    email,
    password
  ) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return error ? { error: error.message } : {};
  };

  const signUpWithEmail: AuthCtx["signUpWithEmail"] = async (
    email,
    password,
    fullName
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName,
        },
      },
    });

    return error ? { error: error.message } : {};
  };

  const signInWithGoogle: AuthCtx["signInWithGoogle"] = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    return error ? { error: error.message } : {};
  };

  const requestPasswordReset: AuthCtx["requestPasswordReset"] = async (
    email
  ) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    return error ? { error: error.message } : {};
  };

  const updatePassword: AuthCtx["updatePassword"] = async (password) => {
    const { error } = await supabase.auth.updateUser({ password });

    return error ? { error: error.message } : {};
  };

  const signOut: AuthCtx["signOut"] = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return error ? { error: error.message } : {};
    } catch (error) {
      return {
        error:
          error instanceof Error ? error.message : "Could not sign out.",
      };
    }
  };

  return (
    <Ctx.Provider
      value={{
        user,
        session,
        role,
        loading,
        roleLoading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        requestPasswordReset,
        updatePassword,
        signOut,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const context = useContext(Ctx);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}