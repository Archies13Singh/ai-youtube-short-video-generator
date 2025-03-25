import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { Ripple } from "../components/ui/ripple";

export default function Home() {
  return (
    <div className="h-screen w-full overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative flex h-full w-full flex-col items-center justify-center bg-background max-w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Ripple Effect */}
        <div className="w-full max-w-full overflow-hidden">
          <Ripple />
        </div>
      </div>
    </div>
  );
}
