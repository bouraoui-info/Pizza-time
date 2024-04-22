import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  // Supprimez l'utilisation de l'adaptateur Prisma
  // adapter: PrismaAdapter(prisma) as Adapter,
  providers: [],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET as string,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
