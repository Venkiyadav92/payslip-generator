const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  designation: { type: String },
  uan: { type: String },
  pan: { type: String },
  pfNumber: { type: String },
  bankAccountNumber: { type: String },
  ifscCode: { type: String },
  basicSalary: { type: String },
  email: { type: String },
  phone: { type: String },
  bankname: { type: String },
  joiningdate: { type: String },
  department: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
