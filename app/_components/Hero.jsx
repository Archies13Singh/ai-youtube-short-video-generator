"use client";
import React from "react";
import { ShimmerButton } from "../../components/ui/shimmer-button";
import { ShinyButton } from "../../components/ui/shiny-button";
import Authentication from "./Authentication";
import { useAuthContext } from "../provider";
import { useRouter } from "next/navigation";

const Hero = ({ onExploreClick }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  return (
    <div className="p-10 flex flex-col items-center justify-center -mt-24 md:px-20 lg:px-36 xl:px-48">
      <h2 className="font-bold text-5xl text-center">
        AI Youtube Short Video Generator
      </h2>
      <p className="text-gray-300 mt-4 text-center text-xl">
        Create engaging, AI-generated YouTube Shorts with ease—perfect for
        content creators, marketers, and influencers.
      </p>
      <div className="mt-7 flex gap-8">
        <div>
          {user ? (
            <ShimmerButton onClick={()=>{router.push("/dashboard")}}>
              <span className="text-[#7b2cbf] font-bold text-lg">
                DashBoard
              </span>
            </ShimmerButton>
          ) : (
            <Authentication>
              <ShimmerButton>
                <span className="text-[#7b2cbf] font-bold text-lg">
                  Get Started
                </span>
              </ShimmerButton>
            </Authentication>
          )}
        </div>
        <div>
          <ShinyButton onClick={onExploreClick}>
            <span className="text-lg px-2 font-bold">Explore</span>
          </ShinyButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
