import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthService from '../../../services/umgService'; // Asegúrate de que la ruta de importación sea correcta

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "admin",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const authService = new AuthService();
        const user = await authService.authService.loginAdmin(credentials.email, credentials.password);
        if (user) {
          return { ...user, isAdmin: true };
        }
        return null;
      }
    }),
    CredentialsProvider({
      id: "user",
      name: "User",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const authService = new AuthService();
        const user = await authService.authService.loginUser(credentials.email, credentials.password);
        if (user) {
          return { ...user, isAdmin: false };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.isAdmin = token.isAdmin;
      return session;
    }
  }
});
