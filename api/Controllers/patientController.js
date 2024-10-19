import Consultation from '../Models/consultationSchema.js';

// Request a Consultation
export const requestConsultation = async (req, res) => {
    const { doctorId, timeSlot } = req.body;
    const patientId = req.user.id; // Ensure req.user is populated correctly by authMiddleware
  
    try {
      // Check if a file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'Please upload an image of the skin condition.' });
      }
  
      // Validate required fields
      if (!doctorId || !timeSlot) {
        return res.status(400).json({ error: 'Doctor ID and time slot are required.' });
      }
  
      const consultation = await Consultation.create({
        doctorId,
        patientId,
        timeSlot,
        skinImage: req.file.path, // Store the file path of the uploaded image
      });
  
      console.log(consultation);
  
      res.status(201).json({ consultation });
    } catch (err) {
      console.error('Error details:', err);
      res.status(500).json({ error: 'Request failed', details: err.message });
    }
  };
  
  
// Track Consultation Status
export const trackStatus = async (req, res) => {
  const { consultationId } = req.params;

  try {
    const consultation = await Consultation.findByPk(consultationId);
    
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.json({ status: consultation.status });
  } catch (err) {
    res.status(500).json({ error: 'Failed to track status', details: err.message });
  }
};
