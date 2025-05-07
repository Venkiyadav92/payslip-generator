import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to the Payslip Generator</h1>
    <Link to="/login"><button>Login</button></Link>
  </div>
);

export default Home;
