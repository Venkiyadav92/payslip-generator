import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import axios from 'axios';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    const res = await axios.get('/api/employees');
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSave = () => {
    fetchEmployees();
    setSelectedEmployee(null);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Manage Employees</h2>
      <EmployeeForm selectedEmployee={selectedEmployee} onSave={handleSave} />
      <h3>Existing Employees</h3>
      <ul>
        {employees.map(emp => (
          <li key={emp._id} onClick={() => setSelectedEmployee(emp)}>
            {emp.name} ({emp.employeeId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEmployees;
