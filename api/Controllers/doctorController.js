import Consultation from "../Models/consultationSchema.js";
import Doctor from "../Models/doctorSchema.js";

// View Consultation Requests
export const viewRequests = async (req, res) => {
  const doctorId = req.user.id; // Get doctor ID from authenticated JWT

  try {
    const consultations = await Consultation.findAll({ where: { doctorId }, include: ['Patient'] });
    res.json({ consultations });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load requests', details: err });
  }
};

// Update Consultation Status
 export const updateStatus = async (req, res) => {
  const { consultationId, status } = req.body;

  try {
    const consultation = await Consultation.findByPk(consultationId);
    if (!consultation) return res.status(404).json({ message: 'Consultation not found' });

    consultation.status = status;
    await consultation.save();

    res.json({ message: 'Consultation status updated', consultation });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status', details: err });
  }
};

// Update Availability
export const updateAvailability = async (req, res) => {
  const doctorId = req.user.id;
  const { availability } = req.body;

  try {
    const doctor = await Doctor.findByPk(doctorId);
    doctor.availability = availability;
    await doctor.save();

    res.json({ message: 'Availability updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update availability', details: err });
  }
};
