"use client"
import { SidebarProvider } from "../../components/ui/sidebar";
import React, { useEffect } from "react";
import AppSideBar from "./_components/appSideBar";
import AppHeader from "./_components/appHeader";
import { useAuthContext } from "../provider";
import { useRouter } from "next/navigation";

const DashboardProvider = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(()=>{
    user && checkUserAuthenticated();
  },[user])


  const checkUserAuthenticated  = ()=>{
    if(!user){
        router.replace('/');
    }
  } 
  return (
    <SidebarProvider>
      <AppSideBar />
      <div className="text-red-50 w-full">
        <AppHeader />
        <div className="p-10">
        {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardProvider;
