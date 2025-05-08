//user can navigate Back/next between steps


import React, { useContext } from 'react'
import { formContext } from '../context/FormContext'

const NavigationButton = () => {

    const {page,setPage,title} = useContext(formContext) 

  return (
    <div>

        <button onClick={()=>{setPage((prev)=>Math.max(prev -1, 0))}} disabled={page===0}>Back</button> 

        <button onClick={()=>setPage((prev)=>Math.min(prev+1, Object.keys(title).length-1))} disabled={page===Object.keys(title).length-1}>Next</button>


    </div>
  )
}

export default NavigationButton