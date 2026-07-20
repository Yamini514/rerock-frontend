"use client";

import { createContext, useContext, useEffect, useState } from "react";

const RamAuthContext = createContext(null);
const STORAGE_KEY = "rerock_ram_session";

export function RamAuthProvider({ children }) {
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

  function login(ramRecord) {
    const session = { ...ramRecord, signedInAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  }

  function logout() {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return <RamAuthContext.Provider value={{ user, login, logout }}>{children}</RamAuthContext.Provider>;
}

export function useRamAuth() {
  const ctx = useContext(RamAuthContext);
  if (!ctx) throw new Error("useRamAuth must be used within RamAuthProvider");
  return ctx;
}
