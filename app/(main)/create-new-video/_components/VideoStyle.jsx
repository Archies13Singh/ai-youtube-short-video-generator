"use client"
import Image from "next/image";
import React, { useState } from "react";

export const options = [
  {
    name: "Rela",
    image: "/realistic.jpg",
  },
  {
    name: "Cinematic",
    image: "/cinematic.jpg",
  },
  {
    name: "Cartoon",
    image: "/3d.jpg",
  },
  {
    name: "Watercolor",
    image: "/watercolor.jpg",
  },
  {
    name: "Cyberpunk",
    image: "/cyberpunk.jpg",
  },
];
const VideoStyle = ({ onHandleInputChangeMethod }) => {
    const [selectedStyle, setSelectedStyle] = useState()
  return (
    <div className="mt-5">
      <h2>Video Styles</h2>
      <p className="text-sm text-gray-400 mb-1">Select Video Style</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        {options?.map((option, index) => (
          <div key={index} className="relative" onClick={()=>{
            setSelectedStyle(option?.name)
            onHandleInputChangeMethod("videoStyle",option?.name)
          }}>
            <Image
              src={option?.image}
              alt={option.name}
              width={500}
              height={120}
              className={`h-[90px] lg:h-[1300px] xl:h-[180px] w-[300px] object-cover rounded-xl p-1 hover:border border-gray-200 ${option?.name == selectedStyle && 'border'}`}
            />
            <h2 className="absolute bottom-1 w-full text-center">{option?.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoStyle;
