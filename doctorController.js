const Doctor = require("../models/doctorModel");

const applyDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor({
      ...req.body,
      userId: req.user.id,
      status: "pending"
    });
    await newDoctor.save();
    res.status(201).json({ message: "Doctor profile request submitted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to apply", err });
  }
};

const getDoctorByUserId = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Cannot fetch doctor", err });
  }
};

module.exports = { applyDoctor, getDoctorByUserId };
