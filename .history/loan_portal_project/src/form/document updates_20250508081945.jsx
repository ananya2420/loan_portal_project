//Application For Structure


import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const DocumentUpdates = () => {

  const [loanType, setLoanType] = useState('')
  const [input, setInput] = useState({})

  const handleChange = (e) => {
    setLoanType(e.target.value)
  }

  const handleSubmit = (e) => {
    const loanAmount = e.target.value
    setInput((values) => ({ ...values, loanAmount }))
  }

  const { register, formState: { errors } } = useForm()

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Document Updates</h1>

        <div className="mb-6">
            <label htmlFor="loanAmount" className="block text-gray-700 font-semibold mb-2">Loan Amount</label>
            <input 
              type="number" 
              id="loanAmount" 
              name="loanAmount" 
              value={input.loanAmount || ''} 
              onChange={handleSubmit} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Loan Amount" 
            />
        </div>

        <div className="mb-6">
            <label htmlFor="loanType" className="block text-gray-700 font-semibold mb-2">Loan Type</label>
            <select 
              id="loanType" 
              value={loanType} 
              onChange={handleChange} 
              {...register('loantype', { required: true })} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a type</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Auto Loan">Auto Loan</option>
            </select>
            {errors.loantype && <p className="text-red-500 text-sm mt-1">Loan type is required</p>}
        </div>

        <div className="flex justify-center">
            <button 
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit Documents
            </button>
        </div>
    </div>
  )
}

export default DocumentUpdates
