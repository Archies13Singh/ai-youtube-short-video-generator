"use client";
import React, { useState } from "react";
import { Player } from "@remotion/player";
import RemotionComposition from "../../../_components/RemotionComposition";

const RemotionPlayer = ({ videoData }) => {
  // const [durationInFrames, setDurationInFrame] = useState(100);


  return (
    <div>
      <Player
        component={RemotionComposition}
        durationInFrames={videoData?.captionsJson ? Math.round(videoData?.captionsJson[videoData?.captionsJson.length - 1]?.end * 30):200}
        compositionWidth={720}
        compositionHeight={1280}
        fps={30}
        controls
        style={{
          width: "25vw",
          height: "70vh",
        }}
        inputProps={{
          videoData,
        }}
      />
    </div>
  );
};

export default RemotionPlayer;
