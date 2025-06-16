// import React, { useState } from "react";
// import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";

// export function Imggen2() {
//   const [prompt, setPrompt] = useState("");
//   const [imageUrl, setImageUrl] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const generateImage = async (textPrompt) => {
//     if (!textPrompt) return alert("Prompt is empty.");
//     setIsLoading(true);

//     const apiKey = "sk-xDtLngf7i0qvIAFv9GT4rtRyFY4zQFQWz5DB7hDTn3EPc7O1"; // 🔒 Replace with env-secured API key

//     try {
//       const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//           text_prompts: [
//             {
//               text: textPrompt,
//             },
//           ],
//           width: 1024,
//           height: 1024,
//           steps: 30,
//           samples: 1,
//           cfg_scale: 7,
//         }),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         console.error("API Error:", err);
//         throw new Error(err.message || "Failed to generate image.");
//       }

//       const result = await response.json();
//       if (result.artifacts && result.artifacts[0]?.base64) {
//         const imageBase64 = result.artifacts[0].base64;
//         setImageUrl(`data:image/png;base64,${imageBase64}`);
//       } else {
//         alert("Failed to generate image. Try again.");
//         console.error("Invalid response format", result);
//       }
//     } catch (error) {
//       console.error("Error generating image:", error);
//       alert("An error occurred while generating the image.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePromptSubmit = (e) => {
//     e.preventDefault();
//     const inputVal = e.target.querySelector("input")?.value;
//     if (inputVal) {
//       setPrompt(inputVal);
//       generateImage(inputVal);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#ebf4f5] to-[#b5c6e0]">
//       <div className="container mx-auto flex flex-col justify-center items-center pt-20 pb-10 px-4">
//         {isLoading && (
//           <div className="w-[1024px] h-[1024px] max-w-full flex items-center justify-center bg-gray-100 rounded-lg mb-4">
//             <p>Generating your image...</p>
//           </div>
//         )}
//         {imageUrl && !isLoading && (
//           <img
//             src={imageUrl}
//             alt="Generated art"
//             className="w-[1024px] h-[1024px] max-w-full object-cover rounded-lg shadow-lg mb-4"
//           />
//         )}
//         <div className="w-full max-w-2xl">
//           <PlaceholdersAndVanishInput
//             placeholders={[
//               "A dragon flying over a city",
//               "Cat in a batman costume",
//               "Futuristic cyberpunk cityscape",
//             ]}
//             onChange={(e) => setPrompt(e.target.value)}
//             onSubmit={handlePromptSubmit}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";

export function Imggen2({ updateCredits }) {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deductCredit = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      
      // Debug: Log what we're getting from localStorage
      console.log("Token:", token ? "exists" : "missing");
      console.log("UserId:", userId);
      console.log("All localStorage keys:", Object.keys(localStorage));
      
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }
      
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      console.log("Sending deduct request with userid:", userId);

      const response = await fetch("http://localhost:5000/deduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);
        throw new Error("Server returned HTML instead of JSON");
      }

      const data = await response.json();
      
      if (!response.ok) {
        console.error("Backend error response:", data);
        if (data.redirect) {
          alert("No credits left! Please purchase more credits.");
          return false;
        }
        throw new Error(data.message || "Failed to deduct credit");
      }

      // Update credits in parent component
      if (updateCredits) {
        updateCredits(data.credits);
      }

      console.log("Credit deducted successfully. New balance:", data.credits);
      return true;
    } catch (error) {
      console.error("Error deducting credit:", error);
      alert("Error deducting credit: " + error.message);
      return false;
    }
  };

  const generateImage = async (textPrompt) => {
    if (!textPrompt) return alert("Prompt is empty.");
    
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to generate images.");
      return;
    }

    setIsLoading(true);

    try {
      // First, try to deduct credit
      const creditDeducted = await deductCredit();
      if (!creditDeducted) {
        setIsLoading(false);
        return; // Stop if credit deduction failed
      }

      // Now generate the image
      const apiKey = "sk-xDtLngf7i0qvIAFv9GT4rtRyFY4zQFQWz5DB7hDTn3EPc7O1";

      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: textPrompt,
            },
          ],
          width: 1024,
          height: 1024,
          steps: 30,
          samples: 1,
          cfg_scale: 7,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("API Error:", err);
        throw new Error(err.message || "Failed to generate image.");
      }

      const result = await response.json();
      if (result.artifacts && result.artifacts[0]?.base64) {
        const imageBase64 = result.artifacts[0].base64;
        setImageUrl(`data:image/png;base64,${imageBase64}`);
      } else {
        alert("Failed to generate image. Try again.");
        console.error("Invalid response format", result);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("An error occurred while generating the image: " + error.message);
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
          <div className="w-[1024px] h-[1024px] max-w-full flex items-center justify-center bg-gray-100 rounded-lg mb-4">
            <div className="text-center">
              <p className="text-lg font-semibold">Generating your image...</p>
              <p className="text-sm text-gray-600 mt-2">This may take a few seconds</p>
            </div>
          </div>
        )}
        {imageUrl && !isLoading && (
          <img
            src={imageUrl}
            alt="Generated art"
            className="w-[1024px] h-[1024px] max-w-full object-cover rounded-lg shadow-lg mb-4"
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