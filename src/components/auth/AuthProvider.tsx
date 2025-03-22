
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";

type UserMetadata = {
  full_name?: string;
  company_name?: string;
  company_type?: 'manufacturer' | 'distributor' | 'both';
  phone?: string;
  address?: string;
  is_admin?: boolean;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userMetadata: UserMetadata | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event, newSession ? "Has session" : "No session");
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setUserMetadata(newSession?.user?.user_metadata as UserMetadata || null);
        setIsLoading(false);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (location.pathname.startsWith('/auth/')) {
            console.log("Redirecting to dashboard after sign in");
            navigate('/dashboard', { replace: true });
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("Redirecting to login after sign out");
          navigate('/auth/login', { replace: true });
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      console.log("Initial session check:", initialSession ? "Has session" : "No session");
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setUserMetadata(initialSession?.user?.user_metadata as UserMetadata || null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    userMetadata,
    isLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
