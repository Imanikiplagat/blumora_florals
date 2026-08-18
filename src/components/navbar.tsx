import { Link, NavLink, useNavigate } from "react-router-dom";
import {  
  Heart,
  Search,
  ShoppingBag,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favourites-context";
import { useAuth } from "@/lib/auth-context";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/gifts", label: "Gifts" },
  { to: "/custom", label: "Custom Bouquet" },
];

export function Navbar() {
  const { count, setOpen } = useCart();
  const { favorites } = useFavorites();
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);

  const initials =
    (user?.user_metadata?.full_name as string | undefined)
      ?.split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("") ??
    user?.email?.[0]?.toUpperCase() ??
    "U";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-15 w-15 shrink-0 place-items-center rounded-full bg-white">
            <img
              src="/neww.png"
              alt="Blumora"
              className="h-8 w-8 object-contain"
            />
          </span>       
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`
              }
            >
              Account
            </NavLink>
          )}

          {role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-[color:var(--rose)] hover:text-primary"
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1 justify-self-end">
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Favorites */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:inline-flex"
            aria-label="Favorites"
            asChild
          >
            <Link to={user ? "/dashboard" : "/auth"}>
              <Heart className="h-5 w-5" />

              {favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-[color:var(--gold)] text-[10px] font-semibold text-[color:var(--ink)]">
                  {favorites.length}
                </span>
              )}
            </Link>
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Cart"
            onClick={() => setOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />

            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Button>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-[color:var(--burgundy)] text-sm font-semibold text-primary-foreground"
                >
                  {initials}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="truncate px-2 py-1.5 text-xs text-muted-foreground">
                  {user.email}
                </div>

                <DropdownMenuSeparator />

                {/* Dashboard */}
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>

                {/* Admin */}
                {role === "admin" && (
                  <DropdownMenuItem
                    onClick={() => navigate("/admin")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                {/* Sign Out */}
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut();
                    navigate("/");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Sign In */
            <Button
              asChild
              className="ml-1 hidden rounded-full bg-[color:var(--burgundy)] px-4 text-primary-foreground hover:bg-[color:var(--rose)] sm:inline-flex"
            >
              <Link to="/auth">Sign in</Link>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Menu"
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobile && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMobile(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-foreground/80 hover:bg-secondary hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {user ? (
              <>
                {/* Mobile Account */}
                <NavLink
                  to="/dashboard"
                  onClick={() => setMobile(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "bg-secondary text-primary"
                        : "text-foreground/80 hover:bg-secondary hover:text-primary"
                    }`
                  }
                >
                  Account
                </NavLink>

                {/* Mobile Admin */}
                {role === "admin" && (
                  <NavLink
                    to="/admin"
                    onClick={() => setMobile(false)}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium ${
                        isActive
                          ? "bg-secondary text-primary"
                          : "text-[color:var(--rose)] hover:bg-secondary"
                      }`
                    }
                  >
                    Admin
                  </NavLink>
                )}
              </>
            ) : (
              /* Mobile Sign In */
              <NavLink
                to="/auth"
                onClick={() => setMobile(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-[color:var(--burgundy)] hover:bg-secondary"
                  }`
                }
              >
                Sign in / Sign up
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}