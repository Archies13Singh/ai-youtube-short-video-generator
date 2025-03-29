"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { Ripple } from "../components/ui/ripple";
import Explore from "./(main)/explore/page";
import { SparklesText } from "../components/ui/sparkles-text";

export default function Home() {
  // Create a ref for the Explore section
  const exploreRef = useRef(null);

  // Function to scroll to the Explore section
  const scrollToExplore = () => {
    console.log("here i am clicked");
    if (exploreRef.current) {
      exploreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative flex h-full w-full flex-col items-center justify-center bg-background max-w-full overflow-x-hidden">
        {/* Ripple Effect (Behind the Hero) */}
        <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-0">
          <Ripple className="border-2 w-full h-full" />
        </div>

        {/* Hero Section - Pass scroll function as prop */}
        <Hero onExploreClick={scrollToExplore} />
      </div>

      {/* Explore Section with Ref */}
      <div ref={exploreRef}>
        <div>
          <SparklesText
            text="EXPLORE"
            className="text-6xl text-center mb-5 scale-x-100"
            sparklesCount={10}
          />
        </div>
        <Explore />
      </div>
    </div>
  );
}
