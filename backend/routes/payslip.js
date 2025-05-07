const express = require('express');
const router = express.Router();

router.post('/payslip', (req, res) => {
  const {
    name,
    employeeId,
    month,
    year,
    basicSalary,
    workingDays,
    presentDays,
    allowance = 0,
    deduction = 0
  } = req.body;

  const basic = Number(basicSalary);
  const allow = Number(allowance);
  const deduc = Number(deduction);
  const present = Number(presentDays);
  const totalWorkingDays = Number(workingDays);

  // Per-day basic salary
  const perDayBasic = basic / totalWorkingDays;
  const presentBasic = perDayBasic * present;

  // Leave deduction (unpaid days)
  const leaveDeduction = perDayBasic * (totalWorkingDays - present);

  // Salary breakdown based on presentBasic
  const hra = presentBasic * 0.4;
  const da = presentBasic * 0.1;
  const otherAllowance = allow;
  const grossSalary = presentBasic + hra + da + otherAllowance;

  const epf = presentBasic * 0.12;
  const esi = grossSalary < 21000 ? grossSalary * 0.0075 : 0;
  const tds = grossSalary * 0.05;

  const totalDeductions = epf + esi + tds + deduc + leaveDeduction;
  const netSalary = grossSalary - totalDeductions;

  const response = {
    name,
    employeeId,
    month,
    year,
    workingDays,
    presentDays,
    salaryBreakdown: {
      basic,
      hra,
      da,
      otherAllowance,
      grossSalary,
      epf,
      esi,
      tds,
      otherDeductions: deduc,
      leaveDeduction,
      totalDeductions,
      netSalary
    }
  };

  res.status(200).json(response);
});

module.exports = router;
