import React from 'react'
import { useNavigate } from 'react-router-dom'

const Review = () => { 

  const navigate = useNavigate(); 

  const handleConfirm=()=>{
    navigate('/thank-you')
  }
  return (
    <div>
        <h1>Review and confirm</h1>
        <p>Summery of user input</p> 
        <button onClick={handleConfirm}>Confirm and Submit</button>
    </div>
  )
}

export default Review