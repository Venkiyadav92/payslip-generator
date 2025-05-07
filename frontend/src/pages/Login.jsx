import React, { useState } from 'react';

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add logic to verify credentials
    alert('Login clicked');
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: 20 }}>
      <h2>Admin Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required /><br /><br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br /><br />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
