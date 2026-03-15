const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/recruiter", require("./routes/recruiterRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/ai/chat", require("./routes/chatRoutes"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});

// root route
app.get("/", (req, res) => {
    res.send("Placement Management System API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});