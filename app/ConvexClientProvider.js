"use client"
import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from "react";
import Provider from "./provider";

const ConvexClientProvider = ({ children }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <ConvexProvider client={convex}>
      <Provider>{children}</Provider>
    </ConvexProvider>
  );
};

export default ConvexClientProvider;
