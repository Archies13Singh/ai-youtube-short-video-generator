import React from "react";
import { Composition } from "remotion";
import RemotionComposition from "../app/_components/RemotionComposition";

const videoData = {
  audioUrl: "",
  captionsJson: [
    {
      confidence: 0.9978388,
      end: 0.39999998,
      start: 0.08,
      word: "once",
    },
    {
      confidence: 0.90130067,
      end: 0.56,
      start: 0.39999998,
      word: "there",
    },
    {
      confidence: 0.99968207,
      end: 0.79999995,
      start: 0.56,
      word: "lived",
    },
    {
      confidence: 0.9996778,
      end: 6.16,
      start: 6,
      word: "its",
    },
    {
      confidence: 0.8835843,
      end: 6.56,
      start: 6.16,
      word: "shell",
    },
    {
      confidence: 0.91679335,
      end: 6.72,
      start: 6.56,
      word: "then",
    },
    {
      confidence: 0.9999291,
      end: 6.7999997,
      start: 6.72,
      word: "the",
    },
    {
      confidence: 0.9938486,
      end: 7.04,
      start: 6.7999997,
      word: "sun",
    },
    {
      confidence: 0.891314,
      end: 7.3599997,
      start: 7.04,
      word: "peeked",
    },
    {
      confidence: 0.99993384,
      end: 7.52,
      start: 7.3599997,
      word: "through",
    },
    {
      confidence: 0.99982315,
      end: 7.6,
      start: 7.52,
      word: "the",
    },
    {
      confidence: 0.9999161,
      end: 7.9199996,
      start: 7.6,
      word: "clouds",
    },
    {
      confidence: 0.87751716,
      end: 8.24,
      start: 7.9199996,
      word: "warming",
    },
    {
      confidence: 0.9998184,
      end: 8.48,
      start: 8.24,
      word: "the",
    },
    {
      confidence: 0.5666252,
      end: 8.8,
      start: 8.48,
      word: "earth",
    },
    {
      confidence: 0.99910265,
      end: 9.12,
      start: 8.8,
      word: "slowly",
    },
    {
      confidence: 0.89922094,
      end: 9.28,
      start: 9.12,
      word: "the",
    },
    {
      confidence: 0.89190567,
      end: 9.44,
      start: 9.28,
      word: "seed",
    },
    {
      confidence: 0.92657566,
      end: 10,
      start: 9.44,
      word: "sprouted",
    },
    {
      confidence: 0.906681,
      end: 10.08,
      start: 10,
      word: "it",
    },
    {
      confidence: 0.9986607,
      end: 10.32,
      start: 10.08,
      word: "pushed",
    },
    {
      confidence: 0.99990094,
      end: 10.48,
      start: 10.32,
      word: "through",
    },
    {
      confidence: 0.99995077,
      end: 10.639999,
      start: 10.48,
      word: "the",
    },
    {
      confidence: 0.99994946,
      end: 10.88,
      start: 10.639999,
      word: "soil",
    },
    {
      confidence: 0.97042334,
      end: 11.2,
      start: 10.88,
      word: "reaching",
    },
    {
      confidence: 0.9999497,
      end: 11.44,
      start: 11.2,
      word: "for",
    },
    {
      confidence: 0.99998236,
      end: 11.5199995,
      start: 11.44,
      word: "the",
    },
    {
      confidence: 0.7774239,
      end: 11.92,
      start: 11.5199995,
      word: "sky",
    },
    {
      confidence: 0.9982547,
      end: 12.08,
      start: 11.92,
      word: "it",
    },
    {
      confidence: 0.99978334,
      end: 12.24,
      start: 12.08,
      word: "grew",
    },
    {
      confidence: 0.99989164,
      end: 12.48,
      start: 12.24,
      word: "into",
    },
    {
      confidence: 0.9991068,
      end: 12.559999,
      start: 12.48,
      word: "a",
    },
    {
      confidence: 0.99995565,
      end: 12.88,
      start: 12.559999,
      word: "beautiful",
    },
    {
      confidence: 0.99964046,
      end: 13.36,
      start: 12.88,
      word: "sunflower",
    },
    {
      confidence: 0.77174824,
      end: 13.679999,
      start: 13.36,
      word: "tall",
    },
    {
      confidence: 0.99972063,
      end: 13.92,
      start: 13.679999,
      word: "and",
    },
    {
      confidence: 0.9029028,
      end: 14.16,
      start: 13.92,
      word: "bright",
    },
    {
      confidence: 0.9996711,
      end: 14.445,
      start: 14.205,
      word: "the",
    },
    {
      confidence: 0.99731874,
      end: 14.925,
      start: 14.445,
      word: "sunflower",
    },
    {
      confidence: 0.99934137,
      end: 15.325,
      start: 14.925,
      word: "smiled",
    },
    {
      confidence: 0.99929285,
      end: 15.485,
      start: 15.325,
      word: "and",
    },
    {
      confidence: 0.9998159,
      end: 15.885,
      start: 15.485,
      word: "attracted",
    },
    {
      confidence: 0.9927164,
      end: 16.205,
      start: 15.885,
      word: "buzzy",
    },
  ],
  images: [
    "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1740827989432.png?alt=media&token=d79775bc-a7cf-4e0a-a041-e6533d79f9e9",
  ],
};
export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Yshorts"
        component={RemotionComposition}
        durationInFrames={Math.round(videoData?.captionsJson[videoData?.captionsJson.length - 1]?.end * 30)}
        fps={30}
        width={720}
        height={1280}
        defaultProps={{
          videoData: videoData,
        }}
      />
    </>
  );
};
