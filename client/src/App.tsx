import { useState, useRef, createContext } from 'react';
import Reviews from './components/Reviews';
import Form from './components/Form';
import './App.css';

interface MainContextType {
  jsonData: {text: string}[] | null;
  setJsonData: React.Dispatch<React.SetStateAction<{text: string}[] | null>>;
  inputTextRef: React.RefObject<HTMLInputElement | null>;
  inputFileRef: React.RefObject<HTMLInputElement | null>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  response: {"Key pain points": string[], "Requests": string[], "Positive Feedback": string[], "Summary of users": string, "PMs prioritize": string[]} | null;
  setResponse: React.Dispatch<React.SetStateAction<{"Key pain points": string[], "Requests": string[], "Positive Feedback": string[], "Summary of users": string, "PMs prioritize": string[]} | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sampleAppIds: string[];
  appDetails: {title: string, summary: string, icon: string} | null;
  setAppDetails: React.Dispatch<React.SetStateAction<{title: string, summary: string, icon: string} | null>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MainContext = createContext<MainContextType>({} as MainContextType);

function App() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputTextRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [jsonData, setJsonData] = useState<{text: string}[] | null>(null);
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<{"Key pain points": string[], "Requests": string[], "Positive Feedback": string[], "Summary of users": string, "PMs prioritize": string[]} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appDetails, setAppDetails] = useState<{title: string, summary: string, icon: string} | null>(null);

  const sampleAppIds = ["com.instagram.android", "com.ludo.king", "com.whatsapp", "com.application.zomato", "com.netflix.mediaclient", "com.duolingo", "com.truecaller", "com.pinterest", "in.startv.hotstar"]

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 font-sans'>
      <div className='bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-lg mx-4'>
        <img className="mx-auto my-4 w-40 object-contain rounded-lg" src="/logoMain.png"/>
        <MainContext.Provider value={{jsonData, setJsonData, inputTextRef, inputFileRef, fileName, setFileName, error, setError, response, setResponse, isLoading, setIsLoading, sampleAppIds, appDetails, setAppDetails}}>
          <Form />
          <Reviews />
        </MainContext.Provider>
      </div>
    </div>
  )
}

export default App
