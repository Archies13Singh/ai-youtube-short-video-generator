import axios from "axios";
import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";
import { generateImageScript } from "../configs/AiModel";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { getServices, renderMediaOnCloudrun } from "@remotion/cloudrun/client";

const BASE_URL = "https://aigurulab.tech";

const ImagePromptScript = `
  Generate Image Prompt for {style} with all details for each scene for 30second video : script : {script}
  - Just give specifying image prompt depends on the story line.
  - donot give camera angle image prompt.
  - Follow the following schema and return json data (max 6-7 images).
  [
    {
  imagePrompt : "",
  sceneContent : <Script Content>'
    }
  ]

`;

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const generateVideoData = inngest.createFunction(
  { id: "generate-video-data" },
  { event: "generate-video-data" },

  async ({ event, step }) => {
    // generate audio file MP3

    const { script, topic, title, caption, videoStyle, voice, recordId } =
      event.data;

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    // Generate Audio File
    const generateAudioFile = await step.run("generateAudioFile", async () => {
      const result = await axios.post(
        BASE_URL + "/api/text-to-speech",
        {
          input: script,
          voice: voice,
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_AI_GURU_LAB_API_KEY, // Your API Key
            "Content-Type": "application/json", // Content Type
          },
        }
      );

      // console.log(result?.data?.audio, "resull");
      return result?.data?.audio;
      // return "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/audio%2F1740565756872.mp3?alt=media&token=afcdaa9a-ace2-4306-bf4e-6fd08f5d292b";
    });
    // Generate captions

    const generateCaptions = await step.run("generateCaptions", async () => {
      console.log("i am here");
      const deepgram = createClient(
        process.env.NEXT_PUBLIC_DEEPGRAM_CAPTION_API_KEY
      );
      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: generateAudioFile,
        },
        // STEP 3: Configure Deepgram options for audio analysis
        {
          model: "nova-3",
        }
      );
      return result?.results?.channels[0]?.alternatives[0]?.words;
    });
    // Genetate Image prompt from script

    const generateImagePrompts = await step.run(
      "generateImagePrompt",
      async () => {
        const FINAL_PROMPT = ImagePromptScript.replace(
          "{style}",
          videoStyle
        ).replace("{script}", script);

        const result = await generateImageScript.sendMessage(FINAL_PROMPT);

        const response = JSON.parse(result?.response?.text());

        return response;
      }
    );

    // Generate images using ai model
    const generateImages = await step.run("generateImages", async () => {
      let images = [];
      images = await Promise.all(
        generateImagePrompts.map(async (element) => {
          const result = await axios.post(
            BASE_URL + "/api/generate-image",
            {
              width: 1024,
              height: 1024,
              input: element?.imagePrompt,
              model: "sdxl", //'flux'
              aspectRatio: "1:1", //Applicable to Flux model only
            },
            {
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_AI_GURU_LAB_API_KEY, // Your API Key
                "Content-Type": "application/json", // Content Type
              },
            }
          );
          console.log(result.data.image); //Output Result: Base 64 Image
          return result?.data?.image;
        })
      );
      return images;
    });
    // save all data to DB

    const updateDB = await step.run("updateDB", async () => {
      const result = await convex.mutation(api?.videoData?.updateVideoRecord, {
        recordId: recordId,
        audioUrl: generateAudioFile,
        captionsJson: generateCaptions,
        images: generateImages,
      });

      return result;
    });

    const renderVideo = await step.run("renderVideo", async () => {
      // Render the video
      const services = await getServices({
        region: "us-east1",
        compatibleOnly: true,
      });

      const serviceName = services[0].serviceName;
      const result = await renderMediaOnCloudrun({
        serviceName,
        region: "us-east1",
        serveUrl: process.env.GCP_SERVER_URL,
        composition: "Yshorts",
        inputProps: {
          videoData: {
            audioUrl: generateAudioFile,
            captionsJson: generateCaptions,
            images: generateImages,
          },
        },
        codec: "h264",
        // updateRenderProgress,
      });

      if (result.type === "success") {
        console.log(result.bucketName);
        console.log(result.renderId);
      }
      return result?.publicUrl;
    });

    const updateDownLoadUrl = await step.run("UpdateDownLoadUrl", async () => {
      const result = await convex.mutation(api?.videoData?.updateVideoRecord, {
        recordId: recordId,
        audioUrl: generateAudioFile,
        captionsJson: generateCaptions,
        images: generateImages,
        downloadUrl : renderVideo
      });

      return result;
    });
    return updateDownLoadUrl;
  }
);
