"use client";

import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";

/**
 * Provides NextAuth session context to all children.
 * Usage: Wrap it around any layout/page that needs session access.
 */
export default function SessionWrapper({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
