//pages and routes
//rei

import React from 'react'
import { useNavigate } from 'react-router-dom'

const Review = () => { 

  const navigate = useNavigate(); 

  const handleConfirm = () => {
    navigate('/thank-you')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Review and Confirm</h1>
        <p className="text-lg text-gray-600 mb-6">Summary of user input</p> 
        <div className="flex justify-center">
          <button 
            onClick={handleConfirm} 
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Confirm and Submit
          </button>
        </div>
    </div>
  )
}

export default Review
