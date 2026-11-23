import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingBag,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Flower2,
  Search,
  Bell,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

const NAV: NavItem[] = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    to: "/admin/products",
    label: "Products",
    icon: Package,
  },
  {
    to: "/admin/inventory",
    label: "Inventory",
    icon: Warehouse,
  },
  {
    to: "/admin/orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    to: "/admin/customers",
    label: "Customers",
    icon: Users,
  },
  {
    to: "/admin/articles",
    label: "Blog",
    icon: FileText,
  },
  {
    to: "/admin/messages",
    label: "Messages",
    icon: MessageSquare,
  },
  {
    to: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    to: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

function AdminLayout() {
  const {
    user,
    role,
    loading,
    roleLoading,
    signOut,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const [mobileOpen, setMobileOpen] = useState(false);

  /*
   * Protect admin routes
   */
  useEffect(() => {
    if (loading || roleLoading) return;

    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }

    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [
    loading,
    roleLoading,
    user,
    role,
    navigate,
  ]);

  /*
   * Close mobile sidebar whenever route changes
   */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /*
   * Loading / unauthorized state
   */
  if (
    loading ||
    roleLoading ||
    !user ||
    role !== "admin"
  ) {
    return (
      <div className="grid min-h-screen place-items-center bg-[color:var(--soft-pink)]/30 text-sm text-muted-foreground">
        Loading admin…
      </div>
    );
  }

  /*
   * Current navigation item
   */
  const current = NAV.find((item) =>
    item.exact
      ? pathname === item.to
      : pathname.startsWith(item.to)
  );

  /*
   * Sign out
   */
  const handleSignOut = async () => {
    const result = await signOut();
    if (result.error) {
      toast.error(result.error);
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[color:var(--soft-pink)]/20">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-background transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--burgundy)] text-white">
            <Flower2 className="h-4 w-4" />
          </span>

          <div>
            <p className="font-display text-lg leading-none text-[color:var(--burgundy)]">
              Blumora
            </p>

            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Admin
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 px-3 py-4">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.to
              : pathname.startsWith(item.to);

            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-[color:var(--burgundy)] text-white"
                    : "text-foreground/70 hover:bg-[color:var(--blush)] hover:text-[color:var(--burgundy)]"
                }`}
              >
                <Icon className="h-4 w-4" />

                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="absolute inset-x-0 bottom-0 border-t border-border p-3">

          {/* Back to store */}
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs text-muted-foreground transition hover:bg-[color:var(--blush)] hover:text-[color:var(--burgundy)]"
          >
            ← Back to store
          </Link>

          {/* Sign out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs text-muted-foreground transition hover:bg-[color:var(--blush)] hover:text-[color:var(--burgundy)]"
          >
            <LogOut className="h-3.5 w-3.5" />

            Sign out
          </button>
        </div>
      </aside>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= MAIN ================= */}
      <div className="lg:pl-64">

        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">

          {/* Mobile menu */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() =>
              setMobileOpen((open) => !open)
            }
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-[color:var(--rose)]" />

            <span className="text-muted-foreground">
              Admin
            </span>

            <span className="text-muted-foreground">
              /
            </span>

            <span className="font-medium text-foreground">
              {current?.label ?? "Dashboard"}
            </span>
          </div>

          {/* Header right */}
          <div className="ml-auto flex items-center gap-2">

            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="search"
                placeholder="Search…"
                className="w-56 rounded-full border border-border bg-secondary/40 py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[color:var(--burgundy)]"
              />
            </div>

            {/* Notifications */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="text-foreground hover:bg-[color:var(--blush)] hover:text-[color:var(--burgundy)]"
            >
              <Bell className="h-4 w-4" />
            </Button>

            {/* User avatar */}
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--burgundy)] text-xs font-semibold text-white">
              {(user.email?.[0] ?? "A").toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;