//Application For Structure
//add  react hook form 

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';




const PersonalInformation = () => {

    const [input,setInput]=useState({})


    const handleChange=(event)=>{
        const fullName=event.target.fullName
        const dateofbirth=event.target.dateofbirth
        const phonenumber=event.target.phonenumber 
        const email=event.target.email

        setInput(values=>({...values,fullName,dateofbirth,phonenumber,email}))
    }


   

    const {register,handleSubmit,formState:{errors}}=useForm()


  return (

    <div>
        <h1>Personal Information</h1>
    
    <form onSubmit={handleSubmit((data)=>console.log(data))}>
        
        <label>
            Full Name
            <input type="text" name="fullName" value={input.fullName} onChange={handleChange} {...register('fullName')}/>
            {errors.fullName && <p>Full name required</p>}
        </label>
        <br />

        <label>
            Date of birth
            <input type='text' name="dateofbirth" value={input.dateofbirth} onChange={handleChange} {...register('dateofbirth')}/>
            {errors.dateofbirth && <p>Date of birth must be required</p>}
        </label>
        <br />

        <label>
            Phone number 
            <input type='number' name='phonenumber' value={input.phonenumber} onChange={handleChange} {...register('phonenumber')}/>
            {errors.phonenumber && <p>Phone number must be required</p>}
        </label>
        <br />

        <label>
            Email address 
            <input type="email" name="email" value={input.email} onChange={handleChange} {...register('email')}/>
            {errors.email && <p>Email must be required.</p>}
        </label>

        <div>
            <button type='submit'>Submit</button>
        </div>
    </form>
    </div>
  )
}

export default PersonalInformation