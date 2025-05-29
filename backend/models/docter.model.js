import mongoose from 'mongoose';

const DocterSchema = new mongoose.Schema({
  
  doctorName: {
    type: String,
    required: true
  },
  Docdate: {
    type: String,
    required: true
  },
  Time: {
    type: String, // We can store time as a string (e.g., "10:00 AM")
    required: true
  },
  image: {
    type: String, // This will hold the URL to the doctor's image
    required: false
  },
  designation: {
    type: String, // e.g., Cardiologist, Neurologist, etc.
    required: false
  }

 
 
});

const Doctor = mongoose.model('Doctor', DocterSchema);

export default Doctor;
