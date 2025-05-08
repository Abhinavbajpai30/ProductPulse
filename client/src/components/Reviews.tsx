import { useContext } from "react";
import { MainContext } from "../App";

function Reviews() {
  const context = useContext(MainContext);
  const jsonData = context?.jsonData;
  const response = context?.response;
  const error = context?.error;
  const isLoading = context?.isLoading;
  const appDetails = context?.appDetails;

  return (
    <div>
      {error && (
        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md text-sm">
          <p>
            <strong className="font-bold">Search Error:</strong> {error}
          </p>
        </div>
      )}

      {appDetails && (
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={appDetails.icon}
              alt={`${appDetails.title} Logo`}
              className="w-24 h-24 object-contain rounded-xl border border-gray-200 shadow-md"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{appDetails.title}</h1>
              <p className="text-gray-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: appDetails.summary }}></p>
            </div>
          </div>
        </div>
      )}

      {isLoading || appDetails || jsonData ? <div className="p-4 bg-gray-50 rounded-xl shadow-md">
      {isLoading && (
        <div>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Analyzing Reviews</h3>
            <p className="text-gray-600">Please wait while we gather the insights...</p>
            <div className="mt-4">
              <svg className="animate-spin h-8 w-8 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              _
            </div>
          </div>

          {jsonData && jsonData.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-3 border-b pb-2">
                Processing the following reviews:
              </h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm pl-4">
                {jsonData.map((review, index) => (
                  <li key={index} className="py-1">
                    {review.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {jsonData && jsonData.length === 0 && isLoading && (
            <p className="text-center text-gray-500 mt-4">
              No reviews to analyze yet.
            </p>
          )}
         </div>
      )}

      {response && (
        <>
          <h4 className="text-2xl font-bold mb-5 text-gray-700 border-b-2 border-blue-500 pb-2 inline-block mt-6">
            🔴 Key Pain Points
          </h4>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            {response["Key pain points"].map((data, index) => {
              return <li key={index}>{data}</li>;
            })}
          </ul>

          <h4 className="text-2xl font-bold mb-5 text-gray-700 border-b-2 border-blue-500 pb-2 inline-block mt-6">
            🔵 Requests
          </h4>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            {response["Requests"].map((data, index) => {
              return <li key={index}>{data}</li>;
            })}
          </ul>

          <h4 className="text-2xl font-bold mb-5 text-gray-700 border-b-2 border-blue-500 pb-2 inline-block mt-6">
            🟢 Positive Feedback
          </h4>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            {response["Positive Feedback"].map((data, index) => {
              return <li key={index}>{data}</li>;
            })}
          </ul>

          <h4 className="text-2xl font-bold mb-5 text-gray-700 border-b-2 border-blue-500 pb-2 inline-block mt-6">
            Summary of Users
          </h4>
          <p className="space-y-3 text-gray-700">
            {response["Summary of users"]}
          </p>

          <h4 className="text-2xl font-bold mb-5 text-gray-700 border-b-2 border-blue-500 pb-2 inline-block mt-6">
            What PMs should prioritize
          </h4>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            {response["PMs prioritize"].map((data, index) => {
              return <li key={index}>{data}</li>;
            })}
          </ul>
        </>
      )}
      </div>
       : ""}
    </div>
  );
}

export default Reviews;
