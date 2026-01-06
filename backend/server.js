const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/recruiter", require("./routes/recruiterRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/recruiter", require("./routes/recruiterRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
