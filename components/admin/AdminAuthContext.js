"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { avatar } from "@/lib/images";

const AdminAuthContext = createContext(null);
const STORAGE_KEY = "rerock_admin_session";

export function AdminAuthProvider({ children }) {
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

  function login({ name, email, role, permissions }) {
    const session = { name, email, role, permissions: permissions || [], avatar: avatar(5), signedInAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  }

  function logout() {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return <AdminAuthContext.Provider value={{ user, login, logout }}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
