import React, { useContext, useState } from 'react';
import {MainContext} from '../App';

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
                <p><strong className="font-bold">Search Error:</strong> {error}</p>
            </div>
        )}

        {/* {jsonData && jsonData.map((review, index) => {
          return <p key={index+1}>{index+1}: {review.text}</p>
        })} */}

        {appDetails && <div>
                <img
                src={appDetails.icon}
                alt={appDetails.title + " Logo"}
                className='mx-auto my-4 w-18 h-18 object-contain rounded-lg shadow-md'
                />
                <h2 className='mx-auto text-4xl font-extrabold text-gray-800 leading-tight mb-2'>{appDetails.title}</h2>
                <p className='mx-auto text-gray-600 italic mb-5'>{appDetails.summary}</p>
            </div>}

        {jsonData && isLoading && <div>
                <h3 className="text-1xl font-semibold mb-4 text-gray-700 text-center my-1.5">Analyzing the reviews, Please wait...</h3>
                <ul className='list-disc list-inside space-y-0.5 text-gray-700 text-1xl'>
                    {jsonData.map((review, index) => {
                        return <li key={index}>{review.text}</li>
                    })}
                </ul>
            </div>}

        {response && <><h4 className='text-2xl font-bold mb-5 text-gray-700 border-b-2 border-blue-500 pb-2 inline-block mt-6'>Key Pain Points</h4>
        <ul className='list-disc list-inside space-y-3 text-gray-700'>
            {response["Key pain points"].map((data, index) => {
                return <li key={index}>{data}</li>
            })}
        </ul>

        <h4 className='text-2xl font-bold mb-5 text-gray-700 border-b-2 border-blue-500 pb-2 inline-block mt-6'>Requests</h4>
        <ul className='list-disc list-inside space-y-3 text-gray-700'>
            {response["Requests"].map((data, index) => {
                return <li key={index}>{data}</li>
            })}
        </ul>

        <h4 className='text-2xl font-bold mb-5 text-gray-700 border-b-2 border-blue-500 pb-2 inline-block mt-6'>Positive Feedback</h4>
        <ul className='list-disc list-inside space-y-3 text-gray-700'>
            {response["Positive Feedback"].map((data, index) => {
                return <li key={index}>{data}</li>
            })}
        </ul>

        <h4 className='text-2xl font-bold mb-5 text-gray-700 border-b-2 border-blue-500 pb-2 inline-block mt-6'>Summary of Users</h4>
        <p className='space-y-3 text-gray-700'>{response['Summary of users']}</p>
        
        <h4 className='text-2xl font-bold mb-5 text-gray-700 border-b-2 border-blue-500 pb-2 inline-block mt-6'>What PMs should prioritize</h4>
        <ul className='list-disc list-inside space-y-3 text-gray-700'>
            {response["PMs prioritize"].map((data, index) => {
                return <li key={index}>{data}</li>
            })}
        </ul>
        
        </>}

    </div>
  )
}

export default Reviews