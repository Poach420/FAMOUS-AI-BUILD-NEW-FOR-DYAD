import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
    isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
  ].join(" ");

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Zap className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">Digital Ninja</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <a href="#features" className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">Features</a>
          <NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/deployments" className={navLinkClass}>Deployments</NavLink>
          <NavLink to="/settings" className={navLinkClass}>Settings</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">Hi, {user.email ?? "User"}</span>
              <Button variant="ghost" onClick={() => signOut()}>Sign Out</Button>
            </>
          ) : (
            <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => setAuthOpen(true)}>Sign In</Button>
          )}
          <Button asChild>
            <Link to="/builder">Get Started</Link>
          </Button>
        </div>
      </div>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  );
};

export default Navbar;