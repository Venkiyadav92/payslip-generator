import React from 'react';

const PayslipPreview = ({ payslipData }) => {
  if (!payslipData) return null;

  const { name, id, month, basicPay, allowances, deductions, netPay } = payslipData;

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold mb-4">Payslip Preview – {month}</h2>
      <p><strong>Employee Name:</strong> {name}</p>
      <p><strong>Employee ID:</strong> {id}</p>
      <hr className="my-2" />
      <p><strong>Basic Pay:</strong> ₹{basicPay.toFixed(2)}</p>
      <p><strong>Allowances:</strong> ₹{allowances.toFixed(2)}</p>
      <p><strong>Deductions:</strong> ₹{deductions.toFixed(2)}</p>
      <hr className="my-2" />
      <p><strong>Net Salary:</strong> ₹{netPay.toFixed(2)}</p>
    </div>
  );
};

export default PayslipPreview;
