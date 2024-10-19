import express from 'express';
import sequelize from './config/db.js';

import authRoutes from './Routes/authRoutes.js';
import patientRoutes from './Routes/patientRoutes.js';
import doctorRoutes from './Routes/docterRoutes.js';
import 'dotenv/config'; // This will load the environment variables from .env file

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);

// Database Sync
const startServer = async () => {
  try {
    await sequelize.sync({alter: true});
    console.log('Database connected and synced');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

startServer();
