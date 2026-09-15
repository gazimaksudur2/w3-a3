"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginAction, logoutAction, sessionAction, signupAction } from "../lib/server-auth";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

type Credentials = {
  email: string;
  password: string;
};

type SignupDetails = Credentials & {
  name: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  signup: (details: SignupDetails) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    sessionAction()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (credentials: Credentials) => {
    setUser(await loginAction(credentials));
  };

  const signup = async (details: SignupDetails) => {
    setUser(await signupAction({
        name: details.name,
        email: details.email,
        password: details.password,
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100",
      }));
  };

  const logout = async () => {
    await logoutAction();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
