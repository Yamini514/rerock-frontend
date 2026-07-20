import { AgentAuthProvider } from "@/components/agent/AgentAuthContext";

export default function AgentRootLayout({ children }) {
  return <AgentAuthProvider>{children}</AgentAuthProvider>;
}
