"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuthContext } from "../../../provider";
import Image from "next/image";
import moment from "moment";
import { RefreshCcw } from "lucide-react";

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const convex = useConvex();
  const { user } = useAuthContext();
  console.log(videoList,"listttt")
  useEffect(() => {
    user && getUserVideoList();
  }, [user]);

  const getUserVideoList = async () => {
    // all user vides
    const result = await convex.query(api?.videoData?.getUserVideos, {
      uid: user?._id,
    });

    setVideoList(result);
    const isPendingVideo = result?.find((item) => item?.status === "pending");
    isPendingVideo && getVideoPendingStatus(isPendingVideo);
  };

  const getVideoPendingStatus = (pendingVideo) => {
    const interValId = setInterval(async () => {
      const result = await convex.query(api?.videoData?.getVideoById, {
        videoId: pendingVideo?._id,
      });

      if (result?.status === "completed") {
        clearInterval(interValId);
        console.log("Video is Ready");
        getUserVideoList();
      }
      console.log("still pending ....");
    }, 5000);
  };
  return (
    <div>
      {videoList?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-28 gap-5 p-5 border-2 border-dashed rounded-xl py-16">
          <div className="text-gray-400">No Videos Available</div>
          <Link href="/create-new-video">
            <Button>Create New Video +</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-5 mt-10">
          {videoList.map((video, index) => (
            <Link key={index} href={"/play-video/" + video?._id}>
              <div  className="relative">
                {video?.status === "completed" ? (
                  <Image
                    src={video?.images[0]}
                    width={500}
                    height={500}
                    alt={video?.title}
                    className="w-full object-cover rounded-xl aspect-[2/3]"
                  />
                ) : (
                  <div className="aspect-[2/3] p-5 w-full rounded-xl bg-slate-900 flex items-center justify-center gap-2">
                    <RefreshCcw className="animate-spin " />
                    <h2>Generating... </h2>
                  </div>
                )}

                <div className="absolute bottom-3 px-5 w-full bg-pink-50 text-black bg-opacity-2">
                  <h2>{video?.title}</h2>
                  <h2>{moment(video?._creationTime).fromNow()}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
