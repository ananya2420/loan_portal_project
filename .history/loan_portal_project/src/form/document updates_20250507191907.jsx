//Application For Structure


import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const DocumentUpdates = () => {

  const [loanType,setLoanType]=useState('')
  const [input,setInput]=useState('')

  const handleChange=(e)=>{
    setLoanType(e.target.value)
  }
  const handleSubmit=(e)=>{
    const loanAmount=e.target.value
    setInput(values=>({...values,loanAmount}))

  }
   const {register,formState:{errors}}=useForm();


  return (
    <div>
        Document updates 

        <label>Loan Amount</label>
        <input type="loan type" name='loan amount' value={input.loanAmount} onChange={handleSubmit}/>


        <div>
            <label>Loan type</label>

            <select value={loanType} onChange={handleChange} {...register('loantype', {required:true})}>
              {errors.loantype && <p>Loan type is required</p>}

                <option value="">Select a type</option>
                <option>Home Loan</option>
                <option>Auto loan </option>
            </select>

      <div>
        <button>Submit Documents</button>
      </div>
        </div>

        <div>
            
        </div>
   

    </div>
    
  )
}

export default DocumentUpdates