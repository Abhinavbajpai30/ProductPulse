import { useState, useRef, useEffect, createContext } from 'react';
import Reviews from './components/Reviews';
import Form from './components/Form';
import './App.css';

export const MainContext = createContext(null);
function App() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputTextRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [jsonData, setJsonData] = useState<object[] | null>(null);
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appDetails, setAppDetails] = useState(null);

  const sampleAppIds = ["com.instagram.android", "com.ludo.king", "com.whatsapp", "com.application.zomato", "com.netflix.mediaclient", "com.duolingo", "com.truecaller", "com.pinterest", "in.startv.hotstar"]

  // useEffect(() => {
  //   fetch('http://127.0.0.1:3000/api?appId=com.google.android.apps.maps').then((res) => {
  //     // console.log(res);
  //     return res.json();
  //   })
  //   .then((data) => setJsonData(data.reviews));
  // }, [])
  

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 font-sans'>
      <div className='bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-lg mx-4'>
        <MainContext.Provider value={{jsonData, setJsonData, inputTextRef, inputFileRef, fileName, setFileName, error, setError, response, setResponse, isLoading, setIsLoading, sampleAppIds, appDetails, setAppDetails}}>
          <Form />
          <Reviews />
        </MainContext.Provider>
      </div>
    </div>
  )
}

export default App
