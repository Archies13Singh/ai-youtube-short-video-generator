const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_STUDIO_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'write 2 different scripts for 30seconds  video on Topic : {topic}\n\n- Give me response in Json format and follow the schema.\n- {\nscripts : [\n{\ncontent:""\n},\n},\n}',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'Okay, I\'m ready. Provide the topic so I can generate two 30-second video scripts in the requested JSON format.\n\nFor example, if you provide the topic "Benefits of Drinking Water", I will return something like this:\n\n```json\n{\n  "scripts": [\n    {\n      "content": "(Open on a person looking tired and sluggish. They reach for a sugary drink.)\\nNarrator: Feeling drained? Skipping water can lead to fatigue.\\n(Person switches to a glass of water and takes a refreshing sip. They visibly perk up.)\\nNarrator: Water helps boost energy, improves focus, and keeps you hydrated all day long!\\n(Text on screen: Drink Water. Feel Better. #Hydration)\\nNarrator: Make water your go-to drink!\\n(Show a close-up of a water bottle. Sound of someone taking a refreshing sip.)"\n    },\n    {\n      "content": "(Visual: Fast-paced montage of people exercising, working, and enjoying life.)\\nUpbeat music playing.\\nNarrator: Did you know water is essential for everything your body does?\\n(Visual: Close-up of clear, refreshing water being poured.)\\nNarrator: From regulating temperature to transporting nutrients, water keeps you running smoothly.\\n(Visual: A variety of healthy foods alongside a glass of water.)\\nNarrator: So, hydrate right! Choose water for a healthier, happier you. \\n(Text on screen: Stay Hydrated. Stay Healthy.  [Company Logo/Water Brand])"\n    }\n  ]\n}\n```\n\nNow, tell me the `topic`.\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());

export const generateImageScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a two different scripts for 30seconds video on : {topic}\n\nDonot add Scene description.\nDonot add anything in braces, Just return the plain story.\n\nGive me response in json format and follow the Schema \n{\nscripts : [\n{\ncontent : ''\n},\n],\n\n}",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "scripts": [\n    {\n      "content": "Topic: Promoting a new coffee shop\\n\\n(Upbeat music playing)\\n\\n**Person 1:** (Smiling, holding a coffee cup) You know, I used to dread Mondays.\\n\\n**Person 2:** (Joining, also holding a coffee) Used to? What changed?\\n\\n**Person 1:** This! (Gestures to the coffee cup) Best coffee in town. New place just opened up.\\n\\n**Person 2:** Seriously? Let\'s go inside! The aroma is amazing. \\n\\n**Voiceover:** [Coffee Shop Name]. Your new favorite coffee is brewing.\\n(Shot of the coffee shop logo and address)\\n(End screen with social media handles)."\n    },\n    {\n      "content": "Topic: Promoting a new coffee shop\\n\\n(Sound of coffee being poured, gentle music)\\n\\n**Voiceover:** Tired of the same old routine?\\n\\n(Quick cuts of people looking tired, bored)\\n\\n**Voiceover:** Discover [Coffee Shop Name]. Where every cup is a moment of escape.\\n\\n(Visually appealing shots of the coffee shop interior, coffee drinks, pastries)\\n\\n**Voiceover:** Hand-crafted coffee, delicious treats, and a welcoming atmosphere. \\n\\n(Shot of barista smiling)\\n\\n**Voiceover:** Find your new happy place. Visit [Coffee Shop Name] today! [Address] \\n(End screen with website address and hours)."\n    }\n  ]\n}\n```',
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: 'Generate Image Prompt for {style} with all details for each scene for 30second video : script : {script}\n  - Just give specifying image prompt depends on the story line.\n  - donot give camera angle image prompt.\n  - Follow the following schema and return json data (max 6-7 images).\n  [\n    {\n  imagePrompt : "",\n  sceneContent : <Script Content>\'\n    }\n  ]\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "I am sorry, I can't generate pixel-based images. That capability is only available to early testers. I can still help you by providing text-based image prompts based on your script.\n\nCould you please provide the script? I will then generate detailed image prompts for each scene, following your specifications and the JSON schema you provided.\n",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: 'Generate Image Prompt for Cinematic Style with all details for each scene for 30second video : script : Rosa Parks\n  - Just give specifying image prompt depends on the story line.\n  - donot give camera angle image prompt.\n  - Follow the following schema and return json data (max 6-7 images).\n  [\n    {\n  imagePrompt : "",\n  sceneContent : <Script Content>\'\n    }\n  ]',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'I am sorry, I can\'t generate pixel-based images. That capability is only available to early testers. I can provide you with a text-based response based on your script. Since you only provided the name "Rosa Parks" and not a complete script, I will create a hypothetical script based on key moments in her life and generate image prompts accordingly.\n\n```json\n[\n  {\n    "imagePrompt": "1950s Montgomery, Alabama. A tired, but dignified Black woman, Rosa Parks, sits on a bus. She wears a modest dress and glasses. Other passengers, mostly white, are visible in the background. The mood is tense, with a hint of defiance in her eyes. Cinematic lighting with a focus on her face.",\n    "sceneContent": "Rosa Parks boards a bus in Montgomery, Alabama."\n  },\n  {\n    "imagePrompt": "Close-up on Rosa Parks\' hands, clasped firmly together. She is refusing to give up her seat to a white passenger. Her expression is calm but resolute. The bus driver is looking at her with a mixture of anger and disbelief. Dark, dramatic lighting emphasizing the conflict.",\n    "sceneContent": "The bus driver asks Rosa to give up her seat, but she refuses."\n  },\n  {\n    "imagePrompt": "Rosa Parks being arrested by a police officer on the bus. The other passengers are watching with mixed expressions: some are angry, some are sympathetic, and some are indifferent. Rain can be seen through the bus windows, adding to the somber atmosphere. High contrast lighting.",\n    "sceneContent": "Rosa is arrested and taken off the bus."\n  },\n  {\n    "imagePrompt": "A large group of African Americans protesting peacefully outside a bus station in Montgomery. They hold signs with slogans like \'Equality Now\' and \'End Segregation.\' The scene is filled with both hope and determination. Golden hour lighting.",\n    "sceneContent": "News of Rosa\'s arrest spreads, sparking a boycott."\n  },\n  {\n    "imagePrompt": "Martin Luther King Jr. speaking at a rally during the Montgomery Bus Boycott. He stands on a makeshift stage, addressing a large crowd of supporters. His expression is passionate and inspiring. Soft, hopeful lighting.",\n    "sceneContent": "Martin Luther King Jr. leads the Montgomery Bus Boycott."\n  },\n  {\n    "imagePrompt": "Rosa Parks smiling gently as she reads the Supreme Court decision declaring bus segregation unconstitutional. She is surrounded by family and supporters. A sense of victory and hope fills the air. Warm, celebratory lighting.",\n    "sceneContent": "The Supreme Court rules segregation on buses unconstitutional."\n  },\n  {\n    "imagePrompt": "An aged Rosa Parks, honored and respected, stands looking towards the future. She is a symbol of courage and equality. Soft, inspiring lighting with focus on hope for generations to come.",\n    "sceneContent": "Rosa Parks, a symbol of the Civil Rights Movement."\n  }\n]\n```',
        },
      ],
    },
  ],
});
