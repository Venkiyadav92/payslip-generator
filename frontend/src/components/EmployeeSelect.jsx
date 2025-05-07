import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeSelect = ({ onSelect }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('/api/employees').then(res => setEmployees(res.data));
  }, []);

  return (
    <select onChange={(e) => {
      const selected = employees.find(emp => emp._id === e.target.value);
      onSelect(selected);
    }}>
      <option value="">Select an employee</option>
      {employees.map(emp => (
        <option key={emp._id} value={emp._id}>{emp.name} ({emp.employeeId})</option>
      ))}
    </select>
  );
};

export default EmployeeSelect;
