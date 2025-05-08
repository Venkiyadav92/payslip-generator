const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const payslipRoute = require('./routes/payslip');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

const app = express();

app.use(bodyParser.json());

const allowedOrigins = ['https://payslip-generator-alpha.vercel.app/'];

// Set up CORS configuration
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions)); // Use CORS middleware

const mongoURI = 'mongodb+srv://vyvenkateshyadav:venki@cluster0.qd0ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/payslip', payslipRoute);         // Existing
app.use('/api/employees', employeeRoutes);     // New

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
