import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import PayslipForm from './components/PayslipForm';
import ManageEmployees from './components/ManageEmployees';
import EmployeeManagementPage from './components/EmployeeManagementPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        {/* Navigation Bar */}
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">HR Portal</h1>
            <nav className="flex gap-6">
              <NavLink to="/" text="Home" />
              <NavLink to="/login" text="Login" />
              {/* <NavLink to="/register" text="Register" /> */}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-9xl mx-auto px-4 py-18">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/payslip" element={<PayslipForm />} />
            <Route path="/manage-employees" element={<ManageEmployees />} />
            <Route path="/employees" element={<EmployeeManagementPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Reusable NavLink Component
const NavLink = ({ to, text }) => (
  <Link
    to={to}
    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
  >
    {text}
  </Link>
);

export default App;
