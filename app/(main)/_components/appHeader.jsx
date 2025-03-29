"use client";
import Image from "next/image";
import { SidebarTrigger } from "../../../components/ui/sidebar";
import React from "react";
import { useAuthContext } from "../../../app/provider";
import LogoutWeb from "../../../components/ui/logoutWeb";
const AppHeader = () => {
  const { user } = useAuthContext();
  return (
    <div className="p-3 flex justify-between items-center">
      <SidebarTrigger />
      <div className="flex gap-3 items-center">
        <Image
          src={user?.photoURL}
          alt="user"
          height={40}
          width={40}
          className="rounded-full border border-gray-500 p-0.5"
        />
        <LogoutWeb />
      </div>
    </div>
  );
};

export default AppHeader;
