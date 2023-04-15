const express = require('express');
const router = express.Router();
const { Appointment, Patient } = require('../models');

// Get all appointments for a specific doctor
router.get('/appointments', async (req, res) => {
  const { doctor_id } = req.query;
  try {
    const appointments = await Appointment.findAll({
      where: { doctor_id },
      include: [{ model: Patient }]
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single appointment by ID
router.get('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id, {
      include: [{ model: Patient }]
    });
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an appointment by ID
router.put('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    const updatedAppointment = await appointment.update(req.body);
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an appointment by ID
router.delete('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    await appointment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
