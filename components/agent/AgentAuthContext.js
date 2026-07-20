"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AgentAuthContext = createContext(null);
const STORAGE_KEY = "rerock_agent_session";

export function AgentAuthProvider({ children }) {
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

  function login(agentRecord) {
    const session = { ...agentRecord, signedInAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  }

  function logout() {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return <AgentAuthContext.Provider value={{ user, login, logout }}>{children}</AgentAuthContext.Provider>;
}

export function useAgentAuth() {
  const ctx = useContext(AgentAuthContext);
  if (!ctx) throw new Error("useAgentAuth must be used within AgentAuthProvider");
  return ctx;
}
