//pages and routes
//thank-you  redirect back to the homepage or another page

import React from 'react'
import { useNavigate } from 'react-router-dom'

const Thankyou = () => { 

  const Navigate = useNavigate(); 

  const handleGoHome=()=>{
    Navigate('/')
  }
  return (
    <div>
        <h1>Submission Confirm</h1>
        <p>After final form Submission</p> 
        <button onClick={handleGoHome}>Go back to home</button>

    </div>
  )
}

export default Thankyou