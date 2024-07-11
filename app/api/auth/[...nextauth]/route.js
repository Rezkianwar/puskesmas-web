import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Users } from "@/app/lib/models/user";
import connectToDB from "@/app/lib/utils";

async function login(credentials) {
  try {
    await connectToDB();
    const user = await Users.findOne({ username: credentials.username, isActive: true });
    if (!user) {
      throw new Error("User not found");
    }
    const isCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isCorrect) {
      throw new Error("Incorrect password");
    }
    return user;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}

export const authOptions = {
  pages: {
    signIn: "/loginDashboard",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const user = await login(credentials);
        if (user) {
          return user;
        } else {
          throw new Error("Invalid login credentials");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.isAdmin = user.isAdmin;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        session.user.username = token.username;
      }
      return session;
    },
    async redirect({ url, baseUrl, token }) {  // Adding token to the redirect callback
      console.log("Redirect callback called"); // Debugging
      console.log("URL:", url); // Debugging
      console.log("Base URL:", baseUrl); // Debugging
      console.log("Token:", token); // Debugging

      return url.startsWith(baseUrl) 
        ? url 
        : baseUrl + (token.isAdmin ? '/dashboard' : '/dashboardPegawai');
    },
  },
};

const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
