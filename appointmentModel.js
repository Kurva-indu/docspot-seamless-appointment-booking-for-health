const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorInfo: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  userInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: String, required: true },
  document: { type: String }, // Will use multer for file uploads
  status: { type: String, default: "pending" } // pending | scheduled | completed | cancelled
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
