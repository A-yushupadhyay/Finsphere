// src/app/layout.tsx
import "./globals.css";
import { Providers } from "./providers";
import ThemeProvider from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell"; // 👈 we'll create this

export const metadata = {
  title: "SmartBank",
  description: "Next-gen Fintech platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
        <Providers>
          <ThemeProvider>
            <AppShell>{children}</AppShell>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
