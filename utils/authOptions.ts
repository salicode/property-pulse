

import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import connectToDatabase from "@/config/database";
import User from "@/models/User";

// Validate environment variables
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID is not set');
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_SECRET is not set');
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log("SignIn callback started", { email: profile?.email });
        
        await connectToDatabase();
        
        if (!profile?.email) {
          console.error("Profile or email is missing");
          return false;
        }

        const userExists = await User.findOne({ email: profile.email });
        
        if (!userExists) {
          const username = profile.name ? 
            profile.name.slice(0, 20).replace(/\s+/g, '').toLowerCase() : 
            profile.email.split('@')[0];
          
          let finalUsername = username;
          let counter = 1;
          while (await User.findOne({ username: finalUsername })) {
            finalUsername = `${username}${counter}`;
            counter++;
          }
          
          await User.create({ 
            email: profile.email, 
            username: finalUsername, 
            image: (profile as any).picture ?? "",
            name: profile.name 
          });
          console.log("New user created:", profile.email);
        }
        
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        if (session.user?.email) {
          await connectToDatabase();
          const user = await User.findOne({ email: session.user.email });
          if (user) {
            session.user.id = user._id.toString();
          }
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    }
  },
  debug: process.env.NODE_ENV === 'development',
};
