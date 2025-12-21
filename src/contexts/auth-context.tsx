import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getSupabase, hasSupabase } from "@/lib/supabase";
import { showError, showSuccess } from "@/utils/toast";

type AuthContextValue = {
  user: { id: string; email?: string } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      const sess = data.session;
      setUser(sess ? { id: sess.user.id, email: sess.user.email ?? undefined } : null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? { id: session.user.id, email: session.user.email ?? undefined } : null);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      showError("Auth is not configured. Add Supabase credentials.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      showError(error.message);
      return;
    }
    showSuccess("Signed in successfully.");
  };

  const signUp = async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      showError("Auth is not configured. Add Supabase credentials.");
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      showError(error.message);
      return;
    }
    showSuccess("Account created. Check your email to confirm.");
  };

  const signOut = async () => {
    const supabase = getSupabase();
    if (!supabase) {
      showError("Auth is not configured. Add Supabase credentials.");
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError(error.message);
      return;
    }
    showSuccess("Signed out.");
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, signIn, signUp, signOut }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};