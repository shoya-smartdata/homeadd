import express from 'express';
import upload from '../Middleware/multerConfig.js';
import { requestConsultation, trackStatus } from '../Controllers/patientController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

// Endpoint for requesting a consultation
// router.post('/consultation', authMiddleware, upload.single('image'), requestConsultation);
router.post('/consultation', authMiddleware, upload.single('images'), requestConsultation);


// Endpoint for tracking status of a consultation
router.get('/consultation/:consultationId/status', authMiddleware, trackStatus);

export default router;
