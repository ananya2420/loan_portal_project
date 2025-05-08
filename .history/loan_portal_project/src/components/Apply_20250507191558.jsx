//pages and routes
//Apply component-redirect to- Review page
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Apply = () => { 

  const [formData,setFormData]=useState({}) 

  const navigate = useNavigate(); 

  const handleSubmit=(e)=>{ 
    e.preventDefault(); 
    navigate('/review')


  }
  return (
    <div>
        <h1>Loan application form</h1>
        <p>Muti-step form</p>

        <form onSubmit={handleSubmit}> 
          <button type='submit'>Submit Application</button>

        </form>
    </div>
  )
}

export default Apply