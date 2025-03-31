"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { AuthContext } from "./_context/AuthContext";
import { useRouter } from "next/navigation";  // Import useRouter for navigation
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const Provider = ({ children }) => {
  const [user, setUser] = useState();
  const router = useRouter();
  const createUser = useMutation(api?.users?.createNewUsers);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If a user is logged in, create the user in the database
        const result = await createUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        setUser(result);
      } else {
        // If no user is authenticated, redirect to the home page
        setUser(null);
        router.push("/");  // Navigate to home page
      }
    });

    // Cleanup on unmount
    return () => unsubscribed();
  }, [router, createUser]);

  return (
    <div>
      <AuthContext.Provider value={{ user }}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </AuthContext.Provider>
    </div>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default Provider;
