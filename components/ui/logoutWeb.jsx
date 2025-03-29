import { LogOut } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebaseConfig";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from "../../components/ui/dialog";
import { Button } from "./button";

const LogoutWeb = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);  // Close the dialog when the "No" button is clicked
  };
  const onSignOutClick = () => {
    signOut(auth)
      .then(() => {
        // Clear cookies
        document.cookie.split(";").forEach((cookie) => {
          document.cookie = cookie
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });
        // Redirect to the home page or desired route
        router.reload();
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };
  return (
    <div>
      {/* <LogOut className="text-[#ffffff]" /> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline"><LogOut className="text-[#ffffff]" /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign Out</DialogTitle>
          <DialogDescription>
          Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3">
          <Button onClick={closeDialog} className="bg-green-500 text-white text-sm w-[100px]">No</Button>
          <Button onClick={() => onSignOutClick()} className="bg-red-500 text-white text-sm w-[100px]">Yes</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogoutWeb;
