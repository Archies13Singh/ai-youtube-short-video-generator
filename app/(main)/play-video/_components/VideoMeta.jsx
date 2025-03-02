import { ArrowLeft, DownloadCloud } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";

const VideoMeta = ({ videoData }) => {
  return (
    <div className="p-5 border rounded-xl">
      <Link href='/dashboard'>
        <h2 className="flex gap-2 items-center">
          <ArrowLeft />
          Back to Dashboard
        </h2>
      </Link>
      <div className="flex flex-col gap-3">
        <h2 className="mt-5">Project Name : {videoData?.title}</h2>
        <p className="text-gray-500">Script : {videoData?.script}</p>
        <h2>Video Style : {videoData?.videoStyle}</h2>

        <Button>
          {" "}
          <DownloadCloud /> Export & Download
        </Button>
      </div>
    </div>
  );
};

export default VideoMeta;
