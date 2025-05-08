//Application For Structure


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoanDetails = () => {
    const [loan, setLoan] = useState('');
    const [repayment, setRepayment] = useState('');
    const [emi, setEmi] = useState('');

    const handleChange = (event) => {
        setLoan(event.target.value);
    };

    const handleInput1 = (event) => {
        setRepayment(event.target.value);
    };

    const handleInput2 = (event) => {
        setEmi(event.target.value);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <h1>Loan Details</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Loan Amount</label>
                <input 
                    type="text" 
                    name="LoanAmount" 
                    {...register('LoanAmount', { required: true })} 
                />
                {errors.LoanAmount && <p>Loan amount is required.</p>}
                <br />
                <label>Loan Type</label>
                <select value={loan} onChange={handleChange}>
                    <option value="personal-loan">Personal loan</option>
                    <option value="Home-loan">Home loan</option>
                    <option value="official-loan">Official loan</option>
                </select>
                <br />
                <label>Repayment Term</label>
                <select value={repayment} onChange={handleInput1}>
                    <option value="10000">10,000</option>
                    <option value="12000">12,000</option>
                </select>
                <br />
                <label>EMI Date</label>
                <select value={emi} onChange={handleInput2}>
                    <option value="6.5.25">6.5.25</option>
                    <option value="8.5.25">8.5.25</option>
                </select>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};


export default LoanDetails;

