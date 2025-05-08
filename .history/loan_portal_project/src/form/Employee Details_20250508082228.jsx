//Application For Structure

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const EmployeeDetails = () => {

  const [status,setStatus]=useState('')
  const [name,setName]=useState('')
  const [years,setYears]=useState('')
  const [tax,setTax]=useState('')

  const handleChange=(e)=>{
    setStatus(e.target.value)
  }

  const handleInput=(e)=>{
    setName(e.target.value)
    
  }
  const handleSubmit=(e)=>{
    setYears(e.target.value)


  }
  const handleTax=(e)=>{
    setTax(e.target.value)
  }

  const {register,formState:{errors}}=useForm();

  return (
    <div>
        
        <p>Employee Details</p>


    <form>
       <label>Employee status</label>

       <select value={status} onChange={handleChange} {...register('status', {required:true})}>
        {errors.status && <p>Matital staus is  required.</p>}
        <option>Married </option>
        <option>Unmarried</option>

       </select>
<br />

       <label>Company name</label>
    <select value={name} onChange={handleInput} {...register('name', {required:true})}>
      {errors.name && <p>Company name must be required.</p>}
       <option>Brain Station</option>
       <option>Inosis solution</option>
       </select>

       <br />

      <label>Years of experience</label>

      <select value={years} onChange={handleSubmit} {...register('years', {required:true})}>
        {errors.years && <p>Years of experience must be requred.</p>}
        <option>2 years of experience</option>
      </select>

      <br />

      <label>Tax Id</label>

      <select value={tax} onChange={handleTax} {...register('tax', {required:true})}>
        {errors.tax && <p>Tax id required.</p>}
        <option>...</option>
      </select>
{/*conditional logic in forms*/}
      {tax ==='self-employed' &&(
        <div>
          <label>Tax Id</label>
          <input type='text' name='text' />

        </div>
      )}
    </form>

    </div>
  )
}

export default EmployeeDetails