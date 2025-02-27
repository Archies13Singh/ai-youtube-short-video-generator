import React from "react";
import { options } from "./VideoStyle";
import Image from "next/image";

const Preview = ({ formData }) => {
  const selectVideoStyle =
    formData && options?.find((item) => item?.name == formData?.videoStyle);
  return (
    formData?.videoStyle && (
      <div className="relative">
        <h2 className="mb-3 text-2xl">Preview</h2>
        <Image
          src={selectVideoStyle?.image}
          alt={selectVideoStyle?.name}
          width={1000}
          height={300}
          className="w-full h-[80vh] object-cover rounded-xl"
        />
        <h1 className={`${formData?.caption?.textStyle} absolute bottom-7 text-center w-full`}>{formData?.caption?.name}</h1>
      </div>
    )
  );
};

export default Preview;
