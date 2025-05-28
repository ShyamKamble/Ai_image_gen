import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";

export function Imggen2() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (textPrompt) => {
    if (!textPrompt) return alert("Prompt is empty.");
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      key: "LimZb3SkHiK8JjiYPlVnVUuvDB9sqhXw29klNrivziRf82NI9hUe4YV8nCjK",
      prompt: textPrompt,
      negative_prompt: "bad quality",
      width: "512",
      height: "512",
      safety_checker: false,
      seed: null,
      samples: 1,
      base64: false,
      webhook: null,
      track_id: null,
    });

    try {
      const response = await fetch(
        "https://modelslab.com/api/v6/realtime/text2img",
        {
          method: "POST",
          headers: myHeaders,
          body: raw,
        }
      );

      const result = await response.json();
      if (result.output && result.output[0]) {
        setImageUrl(result.output[0]);
      } else {
        console.error("No image output received", result);
        alert("Failed to generate image. Please try again.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("An error occurred while generating the image.");
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-gradient-to-r from-[#ebf4f5] to-[#b5c6e0]">
      <div className="container mx-auto flex flex-col justify-center items-center pt-20 pb-10 px-4">
        {isLoading && (
          <div className="w-[512px] h-[512px] flex items-center justify-center bg-gray-100 rounded-lg mb-4">
            <p>Generating your image...</p>
          </div>
        )}
        {imageUrl && !isLoading && (
          <img
            src={imageUrl}
            alt="Generated art"
            className="w-[512px] h-[512px] object-cover rounded-lg shadow-lg mb-4"
          />
        )}
        <div className="w-full max-w-2xl">
          <PlaceholdersAndVanishInput
            placeholders={[
              "A dragon flying over a city",
              "Cat in a batman costume",
              "Futuristic cyberpunk cityscape",
            ]}
            onChange={(e) => setPrompt(e.target.value)}
            onSubmit={handlePromptSubmit}
          />
        </div>
      </div>
    </div>
  );
}
