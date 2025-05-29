import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: String,
    required: true
  },
  appointmentTime: {
    type: String, // We can store time as a string (e.g., "10:00 AM")
    required: true
  },
 
 
});

const appointment = mongoose.model('appointment', appointmentSchema);

export default appointment;
