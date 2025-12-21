import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

const AuthModal = ({ open, onOpenChange }: Props) => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    if (mode === "signin") {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "signin" ? "Sign In" : "Create Account"}</DialogTitle>
          <DialogDescription>Use your email and password.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={submit}>{mode === "signin" ? "Sign In" : "Sign Up"}</Button>
            <Button variant="ghost" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
              {mode === "signin" ? "Need an account?" : "Have an account?"}
            </Button>
          </div>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;