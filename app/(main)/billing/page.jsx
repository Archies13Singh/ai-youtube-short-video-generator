"use client";
import React from "react";
import { useAuthContext } from "../../provider";
import { billingData } from "./_components/billing";
import { Button } from "../../../components/ui/button";
import { Coins } from "lucide-react";
const Billing = () => {
  const { user } = useAuthContext();
  console.log(user?.credits, "userrrDaata");
  return (
    <div>
      {/* Here frist I am going to show the user Credits availablity */}
      <div>
        <div>
          <h1 className="text-[20px] font-bold mb-4">Credits</h1>
          <div className="border border-gray-500 rounded-lg shadow-xl flex justify-between p-5">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Available Credits :</h1>
              <p className="text-[14px] text-gray-300">1 credit = $1</p>
            </div>
            <div>
              <h2>{user?.credits} Credits</h2>
            </div>
          </div>
          <div>
            <p className="text-[12px] text-gray-300 p-5">
              When your credit limit reaches 0, video creation will
              automatically stop. Please buy more credits to continue video
              creation.
            </p>
          </div>
        </div>
      </div>
      {/* Here I am going to show user the list of credits and its pricing */}
      <div>
        <h1 className="mb-4 text-[20px] font-bold text-center sm:text-left">
          Buy More Credits
        </h1>

        <div className="flex flex-wrap justify-center sm:justify-between gap-5">
          {billingData.map((billing, index) => {
            return (
              <div
                key={index}
                className="relative border border-gray-500 rounded-lg px-8 py-3 text-center flex flex-col justify-between gap-3 w-full sm:w-[200px]"
              >
                {/* Discount Badge - FIXED */}
                {billing?.discount > 0 && (
                  <div
                  className="absolute top-1 -right-6  shadow-md"
                  style={{
                    backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2FdiscountTag.jpg?alt=media&token=0e07920f-8a77-4745-bb24-2e1c25a7033f')",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    transform: "rotate(90deg)", 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100px",
                    height: "65px",
                    backgroundRepeat:'no-repeat'
                  }}
                >
                  <span className="text-[14px]">{billing?.discount}% OFF</span>
                </div>
                )}

                {/* Pricing Section */}
                {billing?.discount > 0 ? (
                  <div className="flex gap-2 justify-evenly">
                    <p className="text-gray-100 font-bold text-[18px]">
                      $
                      {billing?.price -
                        (billing?.price * billing?.discount) / 100}
                    </p>
                    <p className="line-through text-[16px] text-red-400">
                      ${billing?.price}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-100 font-bold">${billing?.price}</p>
                )}

                <div>
                  <span className="text-[16px] text-gray-500">Credits: </span>
                  {billing?.credits}
                </div>
                {billing?.preferred && (
                  <div className="bg-blue-800 text-white  rounded-full text-[14px] w-full py-1">
                    {billing?.preferred}
                  </div>
                )}

                <Button className="w-full " onClick={() => {}}>
                  <Coins />
                  Buy Credits
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Billing;
