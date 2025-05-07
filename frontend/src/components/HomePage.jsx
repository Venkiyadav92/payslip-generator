import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-light mb-2">Welcome to</h1>
      <h2 className="text-5xl sm:text-6xl font-extrabold text-yellow-400 mb-6">Elitecreww</h2>
      <p className="text-lg sm:text-xl max-w-3xl mb-10">
        Elitecreww Payslip Generator helps HR teams generate professional salary slips easily and efficiently. 
        Track employee attendance, calculate salary based on working days, and download payslips with one click.
        Start by logging in or registering as an admin to generate your first payslip.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/login">
          <button className="px-6 py-3 rounded-lg bg-white text-blue-800 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
