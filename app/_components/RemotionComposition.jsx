"use client";
import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useVideoConfig,
  useCurrentFrame,
  interpolate,
  Audio,
} from "remotion";

const RemotionComposition = ({ videoData }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const captions = videoData?.captionsJson || [];
  const imageList = videoData?.images || [];

  useEffect(() => {
    if (videoData && captions.length > 0) {
      const totalDuration = captions[captions.length - 1]?.end * fps;
      // setDurationInFrame(Math.round(totalDuration)); // Avoid setting state in render
    }
  }, [videoData, captions, fps]);

  const totalDurationFrames =
    captions.length > 0 ? captions[captions.length - 1]?.end * fps : 100;

  const getCurrentCaption = () => {
    const currentTime = frame / 30;
    const currenntCaption = captions.find(
      (item) => currentTime >= item?.start && currentTime <= item?.end
    );
    return currenntCaption ? currenntCaption?.word : "";
  };
  return (
    <div>
      <AbsoluteFill>
        {imageList.map((item, index) => {
          const startTime = (index * totalDurationFrames) / imageList.length;
          const duration = totalDurationFrames / imageList.length;

          const scale = interpolate(
            frame,
            [startTime, startTime + duration / 2, startTime + duration],
            index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <Sequence
              key={index}
              from={Math.round(startTime)}
              durationInFrames={Math.round(duration)}
            >
              <AbsoluteFill>
                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale})`,
                  }}
                />
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{
        color: 'white',
        justifyContent:'center',
        bottom: 50,
        height: 150,
        top: undefined,
        textAlign:'center'
      }}>
        <h2 className="text-5xl">{getCurrentCaption()}</h2>
      </AbsoluteFill>
      {videoData?.audioUrl && <Audio src={videoData?.audioUrl} />}
    </div>
  );
};

export default RemotionComposition;
