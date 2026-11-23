import { Navigate, Link, useNavigate } from "react-router-dom";
import { LogOut, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-8rem)] place-items-center text-muted-foreground">
        Loading your account...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const fullName = user.user_metadata?.full_name;
  const displayName =
    typeof fullName === "string" ? fullName : user.email ?? "there";

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.error) {
      toast.error(result.error);
      return;
    }
    navigate("/");
  };

  return (
    <section className="mx-auto min-h-[calc(100vh-8rem)] max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-widest text-deep-rose">
        Account
      </p>
      <h1 className="mt-2 font-display text-4xl text-olive sm:text-5xl">
        Welcome, {displayName}
      </h1>

      <div className="mt-8 rounded-3xl border border-border/60 bg-card p-6">
        <p className="text-sm text-muted-foreground">Signed in as</p>
        <p className="mt-1 font-medium text-espresso">{user.email}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          asChild
          className="rounded-full bg-olive text-white hover:bg-deep-olive"
        >
          <Link to="/shop">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue shopping
          </Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </section>
  );
}
