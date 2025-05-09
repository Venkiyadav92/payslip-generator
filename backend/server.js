const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const payslipRoute = require('./routes/payslip');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

const app = express();

// ✅ CORS configuration
const corsOptions = {
  origin: 'https://payslip-generator-alpha.vercel.app', // Your Vercel frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ Handle preflight requests

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://vyvenkateshyadav:venki@cluster0.qd0ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api/payslip', payslipRoute);
app.use('/api/employees', employeeRoutes);

// ✅ Dummy login route (customize as needed)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // TODO: Replace this with real DB user lookup
  if (email === 'admin@example.com' && password === 'admin123') {
    return res.json({ success: true, message: 'Login successful' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
