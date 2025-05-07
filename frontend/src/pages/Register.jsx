import React, { useState } from 'react';

function RegisterPage() {
  const [admin, setAdmin] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Add logic to save admin
    alert('Admin registered');
  };

  return (
    <form onSubmit={handleRegister} style={{ padding: 20 }}>
      <h2>Register New Admin</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required /><br /><br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br /><br />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
