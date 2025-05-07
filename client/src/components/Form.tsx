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

    console.log("prompt:", prompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: config
    });
    setIsLoading(false);
    if (response.text) {
      setResponse(JSON.parse(response.text));
    } else {
      setError("Response text is undefined.");
    }

    setJsonData(null);
    
    // console.log(response.text);
  };

  const handleSubmit = () => {
    const appId = inputTextRef.current!.value;
    if(!appId) {
        inputTextRef.current!.value = sampleAppIds[Math.floor(Math.random() * sampleAppIds.length)];
        handleSubmit();
        return;
    }

    fetch(`http://127.0.0.1:3000/api/reviews?appId=${appId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setError("");
        setJsonData(data.reviews)
        fetchResponse(data.reviews);
      });
    
      fetch(`http://127.0.0.1:3000/api/app?appId=${appId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(!('error' in data)) {
          setAppDetails(data);
        }
      })
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
        Play Store Review Analyzer
      </h2>

      <div className="mt-6">
        <input
          ref={inputTextRef}
          type="text"
          placeholder="Enter AppID"
          className="w-85 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow shadow-sm"
        />
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="ml-3 w-20 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mb-1.5"
        >
          Search
        </button>
      </div>
    </>
  );
}

export default Form;
