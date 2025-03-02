"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { Input } from "../../../../components/ui/input";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import { LoaderIcon, SparklesIcon } from "lucide-react";
import axios from "axios";
import { useAuthContext } from "../../../../app/provider";

const Topics = ({ onHandleInputChangeMethod }) => {
  const suggestions = [
    "Historic Story",
    "Kids Story",
    "Movie Stories",
    "AI Innvoations",
    "Space Mysteries",
    "Horror Stories",
    "Mythological Tales",
    "Tech Breakoughts",
    "Crime Stores",
    "Science Experiments",
    "Motivational Stories",
  ];

  const [selectTopic, setSelectedTopic] = useState("");
  const [selectedScriptIndex, setSelectedScriptIndex] = useState();
  const [scripts, setScripts] = useState();
  const [loading, setLoading] = useState(false);

  const {user} = useAuthContext()
  const generateScript = async () => {
    if(user?.credits <= 0){
      toast('Please Add More Credits');
    }
    try {
      setLoading(true);
      setSelectedScriptIndex(null);
      const result = await axios.post("/api/generate-script", {
        topic: selectTopic,
      });
      setScripts(result.data?.scripts);
    } catch (error) {
      console.error("Error generating script:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2 className="mb-1">Project Title</h2>
        <Input
          placeholder="Project title"
          onChange={(event) => onHandleInputChangeMethod("title",event.target.value)}
        />

        <div className="mt-5"></div>
        <h2>Video Topic</h2>
        <p className="text-sm text-gray-600">Select Video Topic</p>
        <Tabs defaultValue="suggestions" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
          </TabsList>
          <TabsContent value="suggestions">
            Make changes to your account here.
          </TabsContent>

          <TabsContent value="suggestions">
            <div className="">
              {suggestions.map((suggestion, index) => (
                <Button
                  variant="outline"
                  key={index}
                  className={`m-1 ${suggestion === selectTopic && "bg-secondary"}`}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChangeMethod("topic", suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your_topic">
            <div>
              <h2>Enter your own topic</h2>
              <Textarea
                placeholder="Topic"
                className="mt-2"
                onChange={(event) =>
                  onHandleInputChangeMethod("topic", event.target.value)
                }
              />
            </div>
          </TabsContent>
        </Tabs>
        {scripts?.length > 0 && (
          <div className="mt-3">
            <h2>Select the Script</h2>
            <div className="grid grid-cols-2 gap-5 mt-1">
              {scripts?.map((script, index) => (
                <div
                  key={index}
                  className={`p-3 border cursor-pointer rounded-lg mt-3 ${selectedScriptIndex === index && "border-white"}`}
                  onClick={() => {
                    setSelectedScriptIndex(index)
                    onHandleInputChangeMethod("script",script?.content)
                  }}
                >
                  <h2 className="line-clamp-3 text-sm text-gray-300">
                    {script?.content}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {!scripts && (
        <Button
          className="mt-3 p-2"
          size="small"
          onClick={generateScript}
          disabled={loading}
        >
          {loading ? <LoaderIcon className="animate-spin" /> : <SparklesIcon />}
          Generate Script
        </Button>
      )}
    </div>
  );
};

export default Topics;
