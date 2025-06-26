const express = require("express");
const {
  bookAppointment,
  userAppointments,
  doctorAppointments
} = require("../controllers/appointmentController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/book", auth, bookAppointment);
router.get("/user", auth, userAppointments);
router.get("/doctor/:doctorId", auth, doctorAppointments);

module.exports = router;

const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);

