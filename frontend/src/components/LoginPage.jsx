import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('https://payslip-generator-8.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // only if using cookies
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error('Invalid credentials');

    const data = await response.json();
    alert('Login successful');
    navigate('/payslip');
  } catch (error) {
    alert(error.message);
  }
};


  return (
    <div style={container}>
      <form onSubmit={handleLogin} style={form}>
        <h2 style={title}>Admin Login</h2>
        <label>Email:</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
        <label style={{ marginTop: '10px' }}>Password:</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={input} />
        <button type="submit" style={button}>Login</button>
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

export default LoginPage;