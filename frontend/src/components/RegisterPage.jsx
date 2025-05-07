import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const existing = localStorage.getItem(email);
    if (existing) {
      alert('Admin already exists');
    } else {
      localStorage.setItem(email, JSON.stringify({ email, password }));
      alert('Admin registered');
      navigate('/login');
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleRegister} style={form}>
        <h2 style={title}>Register Admin</h2>
        <label>Email:</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
        <label style={{ marginTop: '10px' }}>Password:</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={input} />
        <button type="submit" style={button}>Register</button>
      </form>
    </div>
  );
}

const container = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(to right, #1e3c72, #2a5298)',
};

const form = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '300px'
};

const title = {
  marginBottom: '20px',
  color: '#2a5298'
};

const input = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '5px'
};

const button = {
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#2a5298',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default RegisterPage;
