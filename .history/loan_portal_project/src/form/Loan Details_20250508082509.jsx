//Application For Structure


import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const LoanDetails = () => {
    const [loan, setLoan] = useState('')
    const [repayment, setRepayment] = useState('')
    const [emi, setEmi] = useState('')

    const handleChange = (event) => {
        setLoan(event.target.value)
    }

    const handleInput1 = (event) => {
        setRepayment(event.target.value)
    }

    const handleInput2 = (event) => {
        setEmi(event.target.value)
    }

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Loan Details</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-4">
                    <label htmlFor="LoanAmount" className="block text-gray-700 font-semibold mb-2">Loan Amount</label>
                    <input
                        type="text"
                        id="LoanAmount"
                        name="LoanAmount"
                        {...register('LoanAmount', { required: true })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.LoanAmount && <p className="text-red-500 text-sm mt-1">Loan amount is required.</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="loanType" className="block text-gray-700 font-semibold mb-2">Loan Type</label>
                    <select
                        id="loanType"
                        value={loan}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="personal-loan">Personal Loan</option>
                        <option value="Home-loan">Home Loan</option>
                        <option value="official-loan">Official Loan</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="repaymentTerm" className="block text-gray-700 font-semibold mb-2">Repayment Term</label>
                    <select
                        id="repaymentTerm"
                        value={repayment}
                        onChange={handleInput1}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="10000">10,000</option>
                        <option value="12000">12,000</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="emiDate" className="block text-gray-700 font-semibold mb-2">EMI Date</label>
                    <select
                        id="emiDate"
                        value={emi}
                        onChange={handleInput2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6.5.25">6.5.25</option>
                        <option value="8.5.25">8.5.25</option>
                    </select>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoanDetails
