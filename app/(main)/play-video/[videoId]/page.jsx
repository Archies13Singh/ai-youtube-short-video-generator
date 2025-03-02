"use client";
import React, { useEffect, useState } from "react";
import RemotionPlayer from "../_components/RemotionPlayer";
import VideoMeta from "../_components/VideoMeta";
import { useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";

const PlayVideo = () => {
  const convex = useConvex();
  const { videoId } = useParams();
  const [videoData, setvideoData] = useState();

  useEffect(() => {
    videoId && GetVideoDataById();
  }, [videoId]);
  const GetVideoDataById = async () => {
    const result = await convex.query(api?.videoData?.getVideoById, {
      videoId: videoId,
    });

    console.log(result,"resulltt");
    setvideoData(result);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        {/* Remotion Player */}
        <RemotionPlayer videoData={videoData}/>
      </div>
      <div>
        {/* Video Information */}
        <VideoMeta videoData={videoData} />
      </div>
    </div>
  );
};

export default PlayVideo;
