import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ selectedEmployee, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    designation: '',
    uan: '',
    pan: '',
    pfNumber: '',
    bankAccountNumber: '',
    ifscCode: '',
    basicSalary: '',
    email: '',
    department: '',
    phone: '',
    bankname: '',
    joiningdate: '',
  });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`/api/employees/${formData._id}`, formData);
      } else {
        await axios.post('/api/employees', formData);
      }
      onSave();
      setFormData({
        name: '',
        employeeId: '',
        designation: '',
        uan: '',
        pan: '',
        pfNumber: '',
        bankAccountNumber: '',
        ifscCode: '',
        basicSalary: '',
        email: '',
        department: '',
        phone: '',
        bankname: '',
        joiningdate: '',
      });
    } catch (err) {
      console.error('Failed to save employee:', err);
      alert('Error saving employee.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8 space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        {formData._id ? 'Update Employee' : 'Add New Employee'}
      </h2>

      {[
        'name', 'employeeId', 'designation', 'uan', 'pan',
        'pfNumber', 'bankAccountNumber', 'ifscCode','basicSalary', 'email',
        'department', 'phone', 'bankname', 'joiningdate',
      ].map((field) => (
        <div key={field}>
          <label className="block text-gray-700 font-medium capitalize mb-1">
            {field.replace(/([A-Z])/g, ' $1')}:
          </label>
          <input
            type={field === 'joiningdate' ? 'date' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        {formData._id ? 'Update' : 'Add'} Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
