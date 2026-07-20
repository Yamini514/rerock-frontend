import { RamAuthProvider } from "@/components/ram/RamAuthContext";

export default function RamRootLayout({ children }) {
  return <RamAuthProvider>{children}</RamAuthProvider>;
}
