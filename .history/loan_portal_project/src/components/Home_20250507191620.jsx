//pages and routes

//Home component- redirect to- Apply page

import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => { 
  const navigate =useNavigate();


  const handleApplyClick=()=>{
    navigate('/apply')
  }
  return (
    <div>
        Basic homeage with a CTA to apply for a loan 

        <button onClick={handleApplyClick}>Apply for loan</button>

    </div>
  )
}

export default Home