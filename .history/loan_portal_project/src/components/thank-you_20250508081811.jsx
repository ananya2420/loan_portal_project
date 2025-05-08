//pages and routes
//thank-you  redirect back to the homepage or another page


import React from 'react'
import { useNavigate } from 'react-router-dom'

const Thankyou = () => { 

  const navigate = useNavigate(); 

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-4">Submission Confirmed!</h1>
        <p className="text-lg text-gray-700 text-center mb-6">Thank you for your submission. Your form has been successfully processed.</p> 
        <div className="flex justify-center">
          <button 
            onClick={handleGoHome} 
            className="bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go Back to Home
          </button>
        </div>
    </div>
  )
}

export default Thankyou
