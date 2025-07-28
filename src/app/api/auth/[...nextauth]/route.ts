import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next"; // ✅ FIX: use this import!

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };