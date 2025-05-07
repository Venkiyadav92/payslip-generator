import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PayslipPDF from './PayslipPDF';
import { Link } from 'react-router-dom';

function PayslipForm() {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    month: '',
    year: '',
    basicSalary: '',
    workingDays: '',
    presentDays: '',
    allowance: '',
    deduction: ''
  });

  const [employees, setEmployees] = useState([]);
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/employees');
        setEmployees(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    fetchEmployees();
  }, []);

  const handleEmployeeSelect = (e) => {
    const empId = e.target.value;
    setSelectedEmpId(empId);
    const emp = employees.find(emp => emp._id === empId);
    if (emp) {
      setFormData(prev => ({
        ...prev,
        name: emp.name,
        employeeId: emp.employeeId,
        basicSalary: emp.basicSalary
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/payslip/payslip', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Error generating payslip:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Generate Payslip</h2>

        {/* Added Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Register
          </Link>
          <Link to="/manage-employees" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Manage Employees
          </Link>
        </div>

        {/* Select Employee */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Select Employee:</label>
          <select
            value={selectedEmpId}
            onChange={handleEmployeeSelect}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select --</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.name} ({emp.employeeId})
              </option>
            ))}
          </select>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 font-medium mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}:
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                readOnly={key === 'name' || key === 'employeeId' || key === 'basicSalary'}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Generate
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-bold text-center text-gray-700 mb-4">Payslip for {result.name}</h3>
            <div className="text-gray-700 space-y-2">
              <p><strong>Employee ID:</strong> {result.employeeId}</p>
              <p><strong>Month/Year:</strong> {result.month}/{result.year}</p>
              <p><strong>Present Days:</strong> {result.presentDays} / {result.workingDays}</p>

              <h4 className="font-semibold mt-4">Salary Breakdown:</h4>
              <ul className="list-disc list-inside">
                {Object.entries(result.salaryBreakdown).map(([key, value]) => (
                  <li key={key}><strong>{key}</strong>: ₹{value.toFixed(2)}</li>
                ))}
              </ul>
            </div>

            <div className="text-center mt-6">
              <PayslipPDF
                payslipData={result}
                employee={employees.find(emp => emp._id === selectedEmpId)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PayslipForm;
