import React from 'react'
import { useState } from 'react';
import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";
import {GridBackgroundDemo} from "./components/ui/background"

export function Imggen2() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const generateImage = async (textPrompt) => {
    if (!textPrompt) return alert("Prompt is empty.");

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      key: 'Fa29hssGg50ZugFkfmRv6K0Gp7fu6QBZw8xyUVdb7BLfr23AZuUKtRSnGLle',
      prompt: textPrompt,
      negative_prompt: 'bad quality',
      width: '512',
      height: '512',
      safety_checker: false,
      seed: null,
      samples: 1,
      base64: false,
      webhook: null,
      track_id: null,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch('https://modelslab.com/api/v6/realtime/text2img', requestOptions);
      const result = await response.json();
      if (result.output && result.output[0]) {
        setImageUrl(result.output[0]);
      } else {
        console.error('No image output received', result);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    const inputVal = e.target.querySelector("input")?.value;
    if (inputVal) {
      setPrompt(inputVal);
      generateImage(inputVal);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-4 bg-gradient-to-r from-[#ebf4f5] to-[#b5c6e0]'>
       {imageUrl && (
        <img src={imageUrl} alt="Generated art" className="w-[512px] h-[512px] rounded shadow-lg mt-4" />
      )}
      <PlaceholdersAndVanishInput
        placeholders={["A dragon flying over a city", "Cat in a batman costume"]}
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={handlePromptSubmit}
      />
     
    </div>
  );
}
