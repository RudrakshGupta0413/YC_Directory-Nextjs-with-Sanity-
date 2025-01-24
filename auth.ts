// import NextAuth from "next-auth";
// import Github from "next-auth/providers/github";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     providers: [
//         Github({
//             clientId: process.env.GITHUB_CLIENT_ID || "",
//             clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
//         }),
//     ],
// });

import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID || "",
            clientSecret: process.env.AUTH_GITHUB_SECRET || "",
        }),
    ],
};

export const handlers =  NextAuth(authOptions);
