"use client";

// Temporary: SessionProvider disabled until auth is needed
// import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // For now, just return children without SessionProvider
  return <>{children}</>;
}
