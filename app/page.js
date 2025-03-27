import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { Ripple } from "../components/ui/ripple";
import Explore from "./(main)/explore/page";
import { SparklesText } from "../components/ui/sparkles-text";

export default function Home() {
  return (
    <div className="h-screen w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative flex h-full w-full flex-col items-center justify-center bg-background max-w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Ripple Effect */}
        <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden">
          <Ripple className="border-2 w-full h-full" />
        </div>
      </div>

      {/* Explore Section */}
      <div>
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
