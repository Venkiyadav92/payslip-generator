import React, { useState } from 'react';
import axios from 'axios';

const RegisterEmployee = () => {
  const [form, setForm] = useState({
    employeeId: '',
    name: '',
    uan: '',
    pan: '',
    pfNumber: '',
    bankName: '',
    bankAccount: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employee', form);
      setMessage('Employee registered successfully!');
      setForm({
        employeeId: '',
        name: '',
        uan: '',
        pan: '',
        pfNumber: '',
        bankName: '',
        bankAccount: ''
      });
    } catch (error) {
      setMessage('Error registering employee.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register New Employee</h2>
      <form onSubmit={handleSubmit}>
        <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="uan" placeholder="UAN Number" value={form.uan} onChange={handleChange} />
        <input name="pan" placeholder="PAN Number" value={form.pan} onChange={handleChange} />
        <input name="pfNumber" placeholder="PF Number" value={form.pfNumber} onChange={handleChange} />
        <input name="bankName" placeholder="Bank Name" value={form.bankName} onChange={handleChange} />
        <input name="bankAccount" placeholder="Bank Account No." value={form.bankAccount} onChange={handleChange} />
        <button type="submit">Register Employee</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RegisterEmployee;
