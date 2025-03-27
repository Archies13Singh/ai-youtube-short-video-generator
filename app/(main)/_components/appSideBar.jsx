"use client";
import {
  Gem,
  HomeIcon,
  LucideFileVideo,
  Search,
  WalletCards,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/ui/sidebar";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../../../app/provider";
import Image from "next/image";

const AppSideBar = () => {
  const MenuItems = [
    {
      title: "Home",
      url: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Create New Video",
      url: "/create-new-video",
      icon: LucideFileVideo,
    },
    {
      title: "Explore",
      url: "/explore",
      icon: Search,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: WalletCards,
    },
  ];

  const path = usePathname();
  const { user } = useAuthContext();

  return (
    <Sidebar className="bg-[#EFA6DC]">
      <SidebarHeader>
        <div className="flex justify-center align-center">
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2FVidGenie.png?alt=media&token=8f90d7cb-cf0c-4629-b189-7f5c939853cc"
            }
            width={200}
            height={200}
            alt="VidGenie"
            // className="w-full h-full"
          />
        </div>

        <h3 className="text-sm text-center text-[#7b2cbf]">
          AI Short Video Generator
        </h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mx-5 mt-5">
              <Link href="/create-new-video">
                <Button className="w-full"> + Create New Video</Button>
              </Link>
            </div>
            <SidebarMenu>
              {MenuItems.map((item, index) => (
                <SidebarMenuItem key={index} className="mt-3">
                  <SidebarMenuButton
                    isActive={path === item?.url}
                    className="p-5 w-full"
                  >
                    <Link href={item?.url} className="flex items-center gap-4 w-full">
                      <item.icon
                        className={`${
                          path === item?.url ? "text-white" : "text-[#7b2cbf]"
                        }`}
                      />
                      <p
                        className={`${path === item?.url ? "text-white" : "text-[#7b2cbf]"}`}
                      >
                        {item.title}
                      </p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup></SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-6 py-5 border rounded-lg mb-6 bg-[#7b2cbf]">
          <div className="flex items-center justify-between">
            <Gem className="text-white" />
            <h2 className="text-white">{user?.credits} credits left</h2>
          </div>
          <Button className="w-full mt-5">Buy More Credits</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
