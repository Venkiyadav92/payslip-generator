import React from 'react';
import jsPDF from 'jspdf';

function PayslipPDF({ payslipData, employee }) {
  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Consistent label-value alignment function
    const drawLabelAndValue = (label, value, y, labelX = 25) => {
      const labelWidth = 40;
      doc.text(`${label}:`, labelX, y);
      doc.text(`${value}`, labelX + labelWidth, y);
    };

    // Header
    doc.setFontSize(14);
    doc.setFont('times', 'bold');
    doc.text('EliteCreww', pageWidth / 2, 15, null, null, 'center');

    doc.setFontSize(11);
    doc.setFont('times', 'normal');
    doc.text(`Pay Slip for the month of ${payslipData.month} ${payslipData.year}`, pageWidth / 2, 22, null, null, 'center');

    // Employee Info Box
    doc.setFontSize(10);
    doc.setFont('times', 'normal');
    doc.rect(20, 30, 170, 60);

    // Left column
    drawLabelAndValue('Name', payslipData.name, 37, 25);
    drawLabelAndValue('Employee ID', payslipData.employeeId, 43, 25);
    drawLabelAndValue('Designation', employee?.designation || 'N/A', 49, 25);
    drawLabelAndValue('Month/Year', `${payslipData.month}/${payslipData.year}`, 55, 25);
    drawLabelAndValue('Email', employee?.email || 'N/A', 61, 25);
    drawLabelAndValue('Phone', employee?.phone || 'N/A', 67, 25);

    // Right column
    drawLabelAndValue('Present Days', `${payslipData.presentDays} / ${payslipData.workingDays}`, 37, 120);
    drawLabelAndValue('UAN', employee?.uan || 'N/A', 43, 120);
    drawLabelAndValue('PAN', employee?.pan || 'N/A', 49, 120);
    drawLabelAndValue('PF No.', employee?.pfNumber || 'N/A', 55, 120);
    drawLabelAndValue('Bank A/C No.', employee?.bankAccountNumber || 'N/A', 61, 120);
    drawLabelAndValue('DOJ', employee?.joiningdate || 'N/A', 67, 120);
    drawLabelAndValue('Bank Name', employee?.bankname || 'N/A', 73, 120);

    // Salary Breakdown
    const startY = 100;
    const rowHeight = 8;
    const breakdown = payslipData.salaryBreakdown;
    const earnings = [];
    const deductions = [];

    for (const [key, value] of Object.entries(breakdown)) {
      if (['epf', 'esi', 'tds', 'otherdeductions', 'leavededuction', 'totaldeductions'].includes(key.toLowerCase())) {
        deductions.push([key.toUpperCase(), value]);
      } else if (key.toLowerCase() !== 'netsalary') {
        earnings.push([key.toUpperCase(), value]);
      }
    }

    const maxRows = Math.max(earnings.length, deductions.length);
    const tableHeight = rowHeight * maxRows + 10;
    doc.rect(20, startY, 170, tableHeight);

    const midX = 100;
    doc.line(midX, startY, midX, startY + tableHeight);

    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('EARNINGS', 25, startY + 7);
    doc.text('DEDUCTIONS', midX + 5, startY + 7);

    doc.setFont('times', 'normal');
    doc.setFontSize(9); // Reduced font size for better fit
    let currentY = startY + 15;
    for (let i = 0; i < maxRows; i++) {
      if (earnings[i]) {
        const [key, value] = earnings[i];
        doc.text(`${key}:`, 25, currentY);
        doc.text(`Rs. ${value.toFixed(2)}`, 70, currentY); // Aligned value
      }
      if (deductions[i]) {
        const [key, value] = deductions[i];
        doc.text(`${key}:`, midX + 5, currentY);
        doc.text(`Rs. ${value.toFixed(2)}`, 150, currentY); // Aligned value
      }
      currentY += rowHeight;
    }

    // Net Salary
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.rect(20, currentY, 170, 10);
    const netSalary = breakdown.netSalary;
    doc.text('Net Salary:', 25, currentY + 7);
    doc.text(`Rs. ${netSalary.toFixed(2)}`, 70, currentY + 7);

    // Net Salary in Words
    const numToWords = (n) => {
      const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
        'Seventeen', 'Eighteen', 'Nineteen'];
      const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
      const numberToWords = (num) => {
        if (num < 20) return a[num];
        if (num < 100) return b[Math.floor(num / 10)] + ' ' + a[num % 10];
        if (num < 1000) return a[Math.floor(num / 100)] + ' Hundred ' + numberToWords(num % 100);
        if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand ' + numberToWords(num % 1000);
        if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + ' Lakh ' + numberToWords(num % 100000);
        return 'Amount too large';
      };
      return numberToWords(n).replace(/  +/g, ' ').trim();
    };

    const salaryWords = numToWords(Math.floor(netSalary));
    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.text(`(Rupees ${salaryWords} Only)`, 25, currentY + 17);

    // Footer
    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.text('This is a system generated payslip and does not require signature.', 25, 285);

    doc.save(`${payslipData.name}_${payslipData.month}_${payslipData.year}_Payslip.pdf`);
  };

  return (
    <button className="bg-green-500 text-white p-3 rounded-md hover:bg-green-700" onClick={handleDownload}>
      Download Payslip PDF
    </button>
  );
}

export default PayslipPDF;
