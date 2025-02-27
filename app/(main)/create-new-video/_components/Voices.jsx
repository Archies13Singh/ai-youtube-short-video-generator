import React, { useState } from "react";
import {ScrollArea} from '../../../../components/ui/scroll-area'
const voiceOptions = [
  {
    name: "Liam",
    gender: "Male",
    voice: "am_liam",
    flag: "🇺🇸",
  },
  {
    name: "Michael",
    gender: "Male",
    voice: "am_michael",
    flag: "🇺🇸",
  },
  {
    name: "Onyx",
    gender: "Male",
    voice: "am_onyx",
    flag: "🇺🇸",
  },
  {
    name: "Puck",
    gender: "Male",
    voice: "am_puck",
    flag: "🇺🇸",
  },
  {
    name: "Alice",
    gender: "Female",
    voice: "bf_alice",
    flag: "🚺",
  },
  {
    name: "Emma",
    gender: "Female",
    voice: "bf_emma",
    flag: "🚺",
  },
  {
    name: "Isabella",
    gender: "Female",
    voice: "bf_isabella",
    flag: "🚺",
  },
  {
    name: "Lily",
    gender: "Female",
    voice: "bf_lily",
    flag: "🚺",
  },
  {
    name: "Daniel",
    gender: "Male",
    voice: "bm_daniel",
    flag: "🇬🇧",
  },
  {
    name: "Fable",
    gender: "Male",
    voice: "bm_fable",
    flag: "🇬🇧",
  },
  {
    name: "Alloy",
    gender: "Female",
    voice: "af_alloy",
    flag: "🇺🇸",
  },
  {
    name: "Aoede",
    gender: "Female",
    voice: "af_aoede",
    flag: "🇺🇸",
  },
  {
    name: "Bella",
    gender: "Female",
    voice: "af_bella",
    flag: "🇺🇸",
  },
  {
    name: "Jessica",
    gender: "Female",
    voice: "af_jessica",
    flag: "🇺🇸",
  },
  {
    name: "Kore",
    gender: "Female",
    voice: "af_kore",
    flag: "🇺🇸",
  },
  {
    name: "Nicole",
    gender: "Female",
    voice: "af_nicole",
    flag: "🎧",
  },
  {
    name: "Nova",
    gender: "Female",
    voice: "af_nova",
    flag: "🇺🇸",
  },
  {
    name: "River",
    gender: "Female",
    voice: "af_river",
    flag: "🇺🇸",
  },
  {
    name: "Sarah",
    gender: "Female",
    voice: "af_sarah",
    flag: "🇺🇸",
  },
  {
    name: "Sky",
    gender: "Female",
    voice: "af_sky",
    flag: "🇺🇸",
  },
  {
    name: "Adam",
    gender: "Male",
    voice: "am_adam",
    flag: "🇺🇸",
  },
];

const Voices = ({ onHandleInputChangeMethod }) => {
  const [selectedVoice, setSelectedVoice] = useState();
  return (
    <div className="mt-5">
      <h2>Video Voice</h2>
      <p className="text-sm text-gray-400">Select a voice for your video.</p>
      <div>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4 mt-3">
          <div className="grid grid-cols-2 gap-3">
            {voiceOptions.map((voice, index) => (
              <h2
                onClick={() => {
                  setSelectedVoice(voice?.name);
                  onHandleInputChangeMethod('voice',voice?.voice)
                }}
                className={`cursor-pointer p-3 dark:bg-slate-900 dark:border-white rounded-lg hover:border ${selectedVoice === voice?.name && "border"}`}
                key={index}
              >
                <div className="flex justify-between items-center align-center">
                    <p className="text-2xl">{voice?.flag}</p>
                    <p>{voice?.name}  ({voice?.gender})</p>
                </div>
                 
              </h2>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Voices;
