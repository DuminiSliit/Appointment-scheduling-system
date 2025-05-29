import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  createdocter as createDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
} from '../controllers/ap.controller.js';

const router = express.Router();

// Create an appointment
router.post('/cappointments', createAppointment);

// Get all appointments
router.get('/gappointments', getAppointments);

// Get a single appointment by ID
router.get('/appointments/:id', getAppointmentById);

// Update an appointment by ID
router.put('/uappointments/:id', updateAppointment);

// Delete an appointment by ID
router.delete('/ppointments/:id', deleteAppointment);

// Create a doctor
router.post('/doctors', createDoctor);

// Get all appointments
router.get('/doctors', getDoctors);

// Get a single doctor by ID
router.get('/doctors/:id', getDoctorById);

// Delete a doctor by ID 
router.delete('/doctors/:id', deleteDoctor);

export default router;
