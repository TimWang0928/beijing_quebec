import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Membership tier values: NONE | REGULAR | FAMILY | YOUTH | HONORARY | SUPPORTING
declare module "next-auth" {
  interface User {
    id: string;
    membershipTier?: string;
    membershipExpiresAt?: string | null;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      membershipTier: string;
      membershipExpiresAt: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    membershipTier?: string;
    membershipExpiresAt?: string | null;
  }
}

/** Returns true if the membership expiry date is in the future. */
export function isMembershipActive(expiresAt: string | null | undefined): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt) > new Date();
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user?.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email ?? "",
          name: user.name ?? "",
          membershipTier: (user as any).membershipTier ?? "NONE",
          membershipExpiresAt: (user as any).membershipExpiresAt?.toISOString() ?? null,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.membershipTier = user.membershipTier ?? "NONE";
        token.membershipExpiresAt = user.membershipExpiresAt ?? null;
      }
      // After Google OAuth, fetch DB user to populate membership and id
      if (account?.provider === "google" && token.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: token.email } });
        if (dbUser) {
          token.id = dbUser.id;
          token.membershipTier = (dbUser as any).membershipTier ?? "NONE";
          token.membershipExpiresAt = (dbUser as any).membershipExpiresAt?.toISOString() ?? null;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.membershipTier = (token.membershipTier ?? "NONE") as string;
        session.user.membershipExpiresAt = (token.membershipExpiresAt ?? null) as string | null;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;

      const existing = await prisma.user.findUnique({
        where: { email: user.email ?? "" },
        include: { accounts: true },
      });

      if (!existing) {
        await prisma.user.create({
          data: {
            email: user.email ?? "",
            name: user.name ?? "",
            image: user.image,
            accounts: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                token_type: account.token_type,
                scope: account.scope,
              },
            },
          },
        });
      } else if (!existing.accounts.some((a: any) => a.provider === "google")) {
        await prisma.account.create({
          data: {
            userId: existing.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            token_type: account.token_type,
            scope: account.scope,
          },
        });
      }

      return true;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
};
