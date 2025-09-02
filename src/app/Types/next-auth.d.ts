import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // declare userId  to get it in types, it helps to assign id to session
      email?: string | null;
      name?: string | null;
      image?: string | null;
      rooms?: string[];
    };
  }

  interface User {
    id: string;
    email: string | null;
  }


}
