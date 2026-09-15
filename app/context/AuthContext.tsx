"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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

const API_URL = process.env.API_URL ?? "https://api.escuelajs.co/api/v1/";

class AuthRequestError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  signup: (details: SignupDetails) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function requestAuth<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new AuthRequestError(data?.message ?? "Authentication request failed.", response.status);
  }

  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  const login = async (credentials: Credentials) => {
    const tokens = await requestAuth<{isAvailable: boolean}>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  };

  const signup = async (details: SignupDetails) => {
    const availability = await requestAuth<{ isAvailable: boolean }>("/users/is-available", {
      method: "POST",
      body: JSON.stringify({ email: details.email }),
    });

    if (availability.isAvailable) {
      throw new Error("An account with this email already exists.");
    }

    await requestAuth<AuthUser>("/users/", {
      method: "POST",
      body: JSON.stringify({
        name: details.name,
        email: details.email,
        password: details.password,
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100",
      }),
    });
    await login({ email: details.email, password: details.password });
  };

  const logout = async () => {
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
