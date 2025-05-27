import { useContext } from "react";
import { MainContext } from "../App";
import { GoogleGenAI, Type } from "@google/genai";

function Form() {
  const context = useContext(MainContext);
  if (!context) return null;

  const inputTextRef = context.inputTextRef;
  const setJsonData = context.setJsonData;
  const setError = context.setError;
  const setResponse = context.setResponse;
  const isLoading = context.isLoading;
  const setIsLoading = context.setIsLoading;
  const sampleAppIds = context.sampleAppIds;
  const setAppDetails = context.setAppDetails;

  const apiKey = import.meta.env.VITE_GeminiAPI;
  const ai = new GoogleGenAI({ apiKey: apiKey });

  const config = {
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      required: ["Key pain points", "Requests", "Positive Feedback"],
      properties: {
        "Key pain points": {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
        "Requests": {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
        "Positive Feedback": {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
        "Summary of users": {
          type: Type.STRING,
        },
        "PMs prioritize": {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
      },
    },
  };

  const fetchResponse = async (data : {text: string}[]) => {
    if(!data || data.length===0) {
        console.log('No reviews data available to fetch!');
        setError(`No app found with AppID "${inputTextRef.current!.value}"`);
        return;
    }

    setResponse(null);
    setIsLoading(true);

    const prompt = `You are an expert App Review Analyst. I will provide you with a list of user reviews for an application.
    Please analyze these reviews thoroughly and provide a structured summary.

    Reviews:
    ---
    ${data.map((review, index) => {
        return `${index+1}: ${review.text}\n`;
    })}
    ---

    Based on the reviews above, please provide the following (max 3-5 points each): key pain points, requests, and positive feedback.

    These points should be crisp and easy to understand. Also add a symbol/emoji before each point to make it look better and easy to understand.

    Also, provide a summary of what users are saying and what PMs (product managers) should prioritize.
    `

    // console.log("prompt:", prompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: config
    });
    if (response.text) {
      setResponse(JSON.parse(response.text));
    } else {
      setError("Response text is undefined.");
    }

    setJsonData(null);
    setIsLoading(false);
    
    // console.log(response.text);
  };

  const handleSubmit = () => {
    const appId = inputTextRef.current!.value;
    if(!appId) {
        inputTextRef.current!.value = sampleAppIds[Math.floor(Math.random() * sampleAppIds.length)];
        handleSubmit();
        return;
    }

    fetch(`https://product-pulse-two.vercel.app/api/reviews?appId=${appId}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        setError("");
        setJsonData(data.reviews)
        fetchResponse(data.reviews);
      });
    
      fetch(`https://product-pulse-two.vercel.app/api/app?appId=${appId}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if(!('error' in data)) {
          setAppDetails(data);
        }
      })
  };

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
        Play Store Review Analyzer
      </h1>
      <p className="text-center text-gray-500 mt-2 mb-6">
        Enter a Google Play Store App ID to get started.
      </p>

      <div className="flex items-center mt-6 shadow-md rounded-lg">
        <input
          ref={inputTextRef}
          type="text"
          placeholder="E.g., com.whatsapp"
          className="w-full p-4 border-y border-l border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
        />
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-r-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          Search
        </button>
      </div>
    </>
  );
}

export default Form;
