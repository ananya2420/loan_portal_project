//Application For Structure

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const EmployeeDetails = () => {

  const [status, setStatus] = useState('')
  const [name, setName] = useState('')
  const [years, setYears] = useState('')
  const [tax, setTax] = useState('')

  const handleChange = (e) => {
    setStatus(e.target.value)
  }

  const handleInput = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    setYears(e.target.value)
  }

  const handleTax = (e) => {
    setTax(e.target.value)
  }

  const { register, formState: { errors } } = useForm();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <p className="text-2xl font-semibold text-gray-800 mb-6">Employee Details</p>

      <form>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">Employee Status</label>
          <select 
            id="status" 
            value={status} 
            onChange={handleChange} 
            {...register('status', { required: true })} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {errors.status && <p className="text-red-500 text-sm mt-1">Marital status is required.</p>}
            <option>Married</option>
            <option>Unmarried</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Company Name</label>
          <select 
            id="name" 
            value={name} 
            onChange={handleInput} 
            {...register('name', { required: true })} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {errors.name && <p className="text-red-500 text-sm mt-1">Company name is required.</p>}
            <option>Brain Station</option>
            <option>Inosis Solution</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="years" className="block text-gray-700 font-semibold mb-2">Years of Experience</label>
          <select 
            id="years" 
            value={years} 
            onChange={handleSubmit} 
            {...register('years', { required: true })} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {errors.years && <p className="text-red-500 text-sm mt-1">Years of experience is required.</p>}
            <option>2 years of experience</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="tax" className="block text-gray-700 font-semibold mb-2">Tax ID</label>
          <select 
            id="tax" 
            value={tax} 
            onChange={handleTax} 
            {...register('tax', { required: true })} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {errors.tax && <p className="text-red-500 text-sm mt-1">Tax ID is required.</p>}
            <option>...</option>
          </select>

          {tax === 'self-employed' && (
            <div className="mt-4">
              <label htmlFor="taxIdInput" className="block text-gray-700 font-semibold mb-2">Enter Tax ID</label>
              <input 
                type="text" 
                id="taxIdInput" 
                name="taxId" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your tax ID"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default EmployeeDetails
