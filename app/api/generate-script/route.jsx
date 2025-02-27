import { NextResponse } from "next/server";
import { generateScript } from "../../../configs/AiModel";

const SCRIPT_PROMPT = `Write a two different scripts for 30seconds video on : {topic},

Donot add Scene description.
Donot add anything in braces, Just return the plain story.

Give me response in json format and follow the Schema 
-{
scripts : [
{
content : ''
},
],

}`;

export async function POST(req) {
  const { topic } = await req.json();

  const PROMPT = SCRIPT_PROMPT.replace('{topic}', topic);
  const result = await generateScript.sendMessage(PROMPT);

  const resp = result?.response?.text();

  return NextResponse.json(JSON.parse(resp));
}
