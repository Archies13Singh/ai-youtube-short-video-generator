"use client";
import React, { useState } from "react";
import Topics from "./_components/Topics";
import VideoStyle from "./_components/VideoStyle";
import Voices from "./_components/Voices";
import Caption from "./_components/Captions";
import Preview from "./_components/Preview";
import { LoaderIcon, WandSparkles } from "lucide-react";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import { useMutation } from "convex/react";
import { useAuthContext } from "../../provider";
import { api } from "../../../convex/_generated/api";

const CreateNewVideo = () => {
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const createInitialVideoDataRecord = useMutation(
    api?.videoData?.CreateVideoData
  );
  const onHandleInputChangeMethod = (fileName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fileName]: fieldValue,
    }));

    console.log(formData, "formadata");
  };

  const GenerateVideo = async () => {
    console.log("Generating video...");

    if(user?.credits <= 0){
      toast('Please Add More Credits');
    }

    if (
      !formData?.topic ||
      !formData?.script ||
      !formData?.videoStyle ||
      !formData?.caption ||
      !formData?.voice
    ) {
      console.error("Error: Enter all fields");
      return;
    }

    setLoading(true);

    try {
      // Save video data first
      const resp = await createInitialVideoDataRecord({
        title: formData?.title || "Untitled",
        topic: formData?.topic,
        script: formData?.script,
        videoStyle: formData?.videoStyle,
        caption: formData?.caption,
        voice: formData?.voice,
        uid: user?._id,
        createdBy: user?.email,
        credits: user?.credits,
      });

      console.log("Convex response:", resp);

      // Send request to generate video data
      const result = await axios.post("/api/generate-video-data", {
        ...formData,
        recordId: resp,
      });

      console.log("API response:", result.data);
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-7">
        <div className="col-span-2 p-7 border rounded-xl min-h-screen overflow-auto">
          {/* Topic and Script */}
          <Topics onHandleInputChangeMethod={onHandleInputChangeMethod} />
          {/* Video Image style */}
          <VideoStyle onHandleInputChangeMethod={onHandleInputChangeMethod} />
          {/* Voice */}
          <Voices onHandleInputChangeMethod={onHandleInputChangeMethod} />
          {/* Caption */}
          <Caption onHandleInputChangeMethod={onHandleInputChangeMethod} />

          <Button className="w-full mt-5" onClick={GenerateVideo}>
            {loading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <WandSparkles />
            )}
            Generate Video
          </Button>
        </div>

        <div>
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
