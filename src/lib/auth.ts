// src/lib/auth.ts

import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/dashboard",
  },
  callbacks: {
    async jwt({ token, user }) {
      // When user first signs in
      if (user) {
        token.id = user.id;
        token.role = user.role || "user"; // Default to "user"
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;

        // Automatically assign admin role to specific email
        if (session.user.email === "ay9616180577@gmail.com") {
          await db.user.update({
            where: { email: session.user.email },
            data: { role: "admin" },
          });
        }

        // Ensure bank account exists
        const existing = await db.bankAccount.findFirst({
          where: { userId: token.sub },
        });

        if (!existing) {
          await db.bankAccount.create({
            data: {
              userId: token.sub,
              type: "savings",
              balance: 10000,
            },
          });
          console.log(`💰 Created bank account for user: ${token.sub}`);
        }
      }
      return session;
    },

    async signIn() {
      return true;
    },
  },
};
