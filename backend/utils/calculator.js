module.exports = function calculate(data) {
  const workingDays = 30;
  const perDay = data.basicSalary / workingDays;
  const basicPay = perDay * data.daysPresent;
  const allowances = 1000; // default allowance
  const deductions = (workingDays - data.daysPresent) * perDay;
  const netPay = basicPay + allowances - deductions;

  return { basicPay, allowances, deductions, netPay };
}
