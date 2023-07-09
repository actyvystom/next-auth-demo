import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
const providers = [];

if (process.env.VERCEL_ENV === "preview") {
  providers.push(
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text", placeholder: "fish"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        if (
          credentials.username === "fish" &&
          credentials.password === "password"
        ) {
          return {
            id: "1",
            name: "Flipper",
            email: "thomas.goerldt@actyvyst.com",
          };
        } else {
          return null;
        }
      },
    })
  );
} else {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}

export const authOptions = {
  providers,
};
export default NextAuth(authOptions);
