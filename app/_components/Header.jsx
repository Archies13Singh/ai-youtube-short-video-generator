"use client";
import { Button } from "../../components/ui/button";
import React from "react";
import Authentication from "./Authentication";
import { useAuthContext } from "../provider";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex justify-between items-center p-4">
      {/* logo */}
      <div>
        <h1 className="text-2xl font-2xl">AVI IDO</h1>
      </div>
      {/* content */}
      <div>
        <Authentication>
          {!user ? (
            <Button>Get Started</Button>
          ) : (
            <div className="flex gap-3 items-center">
              <Link href="/dashboard">
                <Button>DashBoard</Button>
              </Link>
              <Image
                src={user?.photoURL}
                alt="userImage"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          )}
        </Authentication>
      </div>
    </div>
  );
};

export default Header;
