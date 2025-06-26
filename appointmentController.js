const Appointment = require("../models/appointmentModel");

const bookAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment({
      ...req.body,
      userInfo: req.user.id,
      status: "pending"
    });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked" });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", err });
  }
};

const userAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userInfo: req.user.id })
      .populate("doctorInfo");
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch appointments", err });
  }
};

const doctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorInfo: req.params.doctorId })
      .populate("userInfo");
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch", err });
  }
};

module.exports = {
  bookAppointment,
  userAppointments,
  doctorAppointments
};
