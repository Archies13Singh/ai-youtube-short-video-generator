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
    <div className="flex justify-between items-center p-2">
      {/* logo */}
      <div>
       
       <Image src={"https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2FVidGenie.png?alt=media&token=8f90d7cb-cf0c-4629-b189-7f5c939853cc"} width={200} height={200} alt="VidGenie"/>
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
