import { useContext } from "react";
import { MainContext } from "../App";

function Reviews() {
  const context = useContext(MainContext);
  const { response, error, isLoading, appDetails } = context || {};

  const renderSection = (title: string, data: string[] | undefined, icon: string, color: string) => {
    if (!data || data.length === 0) return null;
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{borderColor: color}}>
            <h4 className="text-xl font-bold mb-4 flex items-center" style={{color: color}}>
                <span className="mr-3 text-2xl">{icon}</span>
                {title}
            </h4>
            <ul className="space-y-3 text-gray-700">
                {data.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-gray-500 mr-2">▪</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
  };

  const renderSummarySection = (title: string, data: string | undefined, icon: string) => {
    if (!data) return null;
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-4 text-gray-700 flex items-center">
                <span className="mr-3 text-2xl">{icon}</span>
                {title}
            </h4>
            <p className="space-y-3 text-gray-700 leading-relaxed">
                {data}
            </p>
        </div>
    );
  }

  const AppCard = () => {
    if(!appDetails) return null;
    return (
      <div className="p-6 bg-gray-50 rounded-xl shadow-inner border border-gray-200 mt-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                  src={appDetails.icon}
                  alt={`${appDetails.title} Logo`}
                  className="w-28 h-28 object-contain rounded-2xl border-2 border-white shadow-lg flex-shrink-0"
              />
              <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{appDetails.title}</h1>
                  <div className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: appDetails.summary }}></div>
              </div>
          </div>
      </div>
  )}

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg shadow">
        <p><strong className="font-bold">Search Error:</strong> {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (<>
      <AppCard/>
      <div className="text-center my-10">
        <svg className="animate-spin h-10 w-10 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mt-4">Analyzing Reviews...</h3>
        <p className="text-gray-500">Please wait while we gather the insights.</p>
      </div>
    </>);
  }

  return (
    <div className="mt-8 space-y-8">
        <AppCard/>

        {response && (
            <div className="space-y-6">
                {renderSection("Key Pain Points", response["Key pain points"], '🔴', '#EF4444')}
                {renderSection("Requests", response["Requests"], '🔵', '#3B82F6')}
                {renderSection("Positive Feedback", response["Positive Feedback"], '🟢', '#22C55E')}
                {renderSummarySection("Summary of Users", response["Summary of users"], '📊')}
                {renderSection("What PMs should prioritize", response["PMs prioritize"], '🎯', '#8B5CF6')}
            </div>
        )}
    </div>
  );
}

export default Reviews;