"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ClientAuthContext = createContext(null);
const STORAGE_KEY = "rerock_client_session";

export function ClientAuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = not yet checked, null = signed out

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- seeds session from localStorage (external source) on initial mount
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  }, []);

  function login({ name, email, phone, avatar, memberSince, location }) {
    const session = { name, email, phone, avatar, memberSince, location, signedInAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  }

  function logout() {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return <ClientAuthContext.Provider value={{ user, login, logout }}>{children}</ClientAuthContext.Provider>;
}

export function useClientAuth() {
  const ctx = useContext(ClientAuthContext);
  if (!ctx) throw new Error("useClientAuth must be used within ClientAuthProvider");
  return ctx;
}
