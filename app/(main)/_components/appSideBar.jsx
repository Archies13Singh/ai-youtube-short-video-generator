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
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-2xl text-center mt-3">AVI IDO</h1>
        <h3 className="text-sm text-center text-gray-500">
          AI Short Video Generator
        </h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mx-5 mt-5">
              <Link href='/create-new-video'>
                <Button className="w-full"> + Create New Video</Button>
              </Link>
            </div>
            <SidebarMenu>
              {MenuItems.map((item, index) => (
                <SidebarMenuItem key={index} className="mt-3">
                  <SidebarMenuButton
                    isActive={path === item?.url}
                    className="p-5"
                  >
                    <Link href={item?.url} className="flex items-center gap-4">
                      <item.icon />
                      {item.title}
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
        <div className="px-6 py-5 border rounded-lg mb-6 bg-gray-800">
          <div className="flex items-center justify-between">
            <Gem className="text-gray-400" />
            <h2 className="text-gray-400">{user?.credits} credits left</h2>
          </div>
          <Button className="w-full mt-5">Buy More Credits</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
