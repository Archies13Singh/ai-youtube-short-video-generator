import React, { useState } from "react";
const options = [
  {
    name: "Whisper Gray",
    textStyle: "text-2xl text-gray-400 italic",
  },
  {
    name: "Echo Bold",
    textStyle: "text-2xl font-bold text-gray-500 tracking-wide",
  },
  {
    name: "Vibrant Pulse",
    textStyle: "text-2xl font-semibold text-red-500",
  },
  {
    name: "Neon Glow",
    textStyle: "text-2xl text-white bg-blue-600 px-2 py-1 rounded shadow-md",
  },
  {
    name: "Muted Whisper",
    textStyle: "text-2xl text-gray-500 uppercase tracking-wider",
  },
  {
    name: "Shimmer Gold",
    textStyle: "text-2xl text-yellow-500 font-medium shadow-sm",
  },
  {
    name: "Shadow Flux",
    textStyle: "text-2xl text-gray-300 shadow-lg",
  },
  {
    name: "Luminous Blue",
    textStyle: "text-2xl text-blue-500 font-semibold",
  },
  {
    name: "Frosted Silver",
    textStyle: "text-2xl text-gray-300 italic",
  },
  {
    name: "Cyberwave",
    textStyle:
      "text-2xl text-green-400 font-medium bg-gray-900 px-2 py-1 rounded",
  },
];

const Captions = ({onHandleInputChangeMethod}) => {

  const [selectedCaption, setSelectedCaption] = useState()
  return (
    <div className="mt-5">
      <h2>Caption Style</h2>
      <p className="text-sm text-gray-400"> Select Option Style</p>
      <div className="flex flex-wrap gap-4 mt-2">
        {
            options.map((option, index)=>(
                <div key={index} onClick={()=>{
                    setSelectedCaption(option?.name)
                    onHandleInputChangeMethod("caption",option)
                }} className={`p-2 bg-slate-900 hover:border border-gray-300 cursor-pointer rounded-lg ${selectedCaption===option?.name && "border"}`}>
                    <h1 className={option?.textStyle}>{option?.name}</h1>
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default Captions;
