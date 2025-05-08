//Application For Structure
//add  react hook form 

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const PersonalInformation = () => {
    const [input, setInput] = useState({})

    const handleChange = (event) => {
        const fullName = event.target.fullName
        const dateofbirth = event.target.dateofbirth
        const phonenumber = event.target.phonenumber 
        const email = event.target.email

        setInput(values => ({ ...values, fullName, dateofbirth, phonenumber, email }))
    }

    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10">
            <h1 className="text-2xl font-semibold text-center mb-6">Personal Information</h1>

            <form onSubmit={handleSubmit((data) => console.log(data))} className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Full Name</span>
                    <input 
                        type="text" 
                        name="fullName" 
                        value={input.fullName} 
                        onChange={handleChange} 
                        {...register('fullName')} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">Full name required</p>}
                </label>

                <br />

                <label className="block">
                    <span className="text-gray-700">Date of birth</span>
                    <input 
                        type='text' 
                        name="dateofbirth" 
                        value={input.dateofbirth} 
                        onChange={handleChange} 
                        {...register('dateofbirth')} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
                    />
                    {errors.dateofbirth && <p className="text-red-500 text-sm mt-1">Date of birth must be required</p>}
                </label>
                <br />

                <label className="block">
                    <span className="text-gray-700">Phone number</span>
                    <input 
                        type='number' 
                        name='phonenumber' 
                        value={input.phonenumber} 
                        onChange={handleChange} 
                        {...register('phonenumber')} 
                        aria-label='' 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
                    />
                    {errors.phonenumber && <p className="text-red-500 text-sm mt-1">Phone number must be required</p>}
                </label>

                <br />

                <label className="block">
                    <span className="text-gray-700">Email address</span>
                    <input 
                        type="email" 
                        name="email" 
                        value={input.email} 
                        onChange={handleChange} 
                        {...register('email')} 
                        aria-label='' 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">Email must be required.</p>}
                </label>

                <br />

                <div className="text-center">
                    <button 
                        type='submit' 
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PersonalInformation
