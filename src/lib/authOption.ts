import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../lib/db";
import { NextAuthOptions } from "next-auth";
import z from "zod";
import bcrypt from "bcryptjs";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Minimum 6 digit password required" }),
  intent: z.enum(["signin", "signup"]).default("signin"),
});

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) {
          throw new Error("InvalidForm");
        }

        const { email, password, intent } = parsed.data;

        const existing = await prisma.user.findUnique({ where: { email } });

        if (!existing) {
          if (intent !== "signup") {
            throw new Error("NoAccount, Please signUp");
          }
          const hashed = await bcrypt.hash(password, 10);
          const created = await prisma.user.create({
            data: { email, password: hashed },
          });
          return { id: created.id.toString(), email: created.email };
        }

        if (!existing.password) {
          throw new Error("Invalid password");
        }

        const ok = await bcrypt.compare(password, existing.password);
        if (!ok) {
          throw new Error("InvalidPassword");
        }

        return { id: existing.id.toString(), email: existing.email };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const dbUser = await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: { email: user.email, name: user.name ?? "" },
      });

      user.id = dbUser.id.toString();
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
