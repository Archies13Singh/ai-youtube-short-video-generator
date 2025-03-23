"use client";
import React, { use, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { AuthContext } from "./_context/AuthContext";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Provider = ({ children }) => {
  const [user, setUser] = useState();
  const createUser = useMutation(api?.users?.createNewUsers);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async (user) => {
      const result = await createUser({
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      });

      console.log(result, "result");
      setUser(result);
    });

    return () => unsubscribed();
  }, []);
  return (
    <div>
      <AuthContext.Provider value={{ user }}>
        <PayPalScriptProvider
          options={{ clientId: process.env.PAYPAL_CLIENT_ID }}
        >
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </NextThemesProvider>
        </PayPalScriptProvider>
      </AuthContext.Provider>
    </div>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default Provider;
