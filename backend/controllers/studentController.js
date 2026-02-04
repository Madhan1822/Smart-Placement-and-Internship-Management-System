const Application = require("../models/Application");
const StudentProfile = require("../models/StudentProfile");
const Job = require("../models/Job");
const pdf = require("pdf-parse");
const fs = require("fs");
const path = require("path");

// ---------------- APPLY JOB ----------------
exports.applyJob = async (req, res) => {
  try {
    const alreadyApplied = await Application.findOne({
      studentId: req.user.id,
      jobId: req.params.jobId
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      studentId: req.user.id,
      jobId: req.params.jobId
    });

    res.status(201).json(application);
  } catch (err) {
    console.error("Apply Job Error:", err);
    res.status(500).json({ message: "Failed to apply for job" });
  }
};

// ---------------- GET PROFILE ----------------
exports.getProfile = async (req, res) => {
  try {
    let profile = await StudentProfile
      .findOne({ userId: req.user.id })
      .populate("userId");

    if (!profile) {
      profile = await StudentProfile.create({ userId: req.user.id });
    }

    res.json(profile);
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// ---------------- UPDATE PROFILE ----------------
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let resumeText = "";
    let resumeFileName = null;

    // ---------------- PDF PARSE + SAVE FILE ----------------
    if (req.file) {
      // Generate unique filename
      resumeFileName = `resume_${userId}_${Date.now()}.pdf`;

      // Ensure the upload directory exists
      const uploadDir = path.join(__dirname, "../uploads/resumes");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uploadPath = path.join(uploadDir, resumeFileName);

      // Save PDF to disk
      fs.writeFileSync(uploadPath, req.file.buffer);

      // Parse PDF text
      try {
        const pdfData = await pdf(req.file.buffer);
        resumeText = pdfData.text;
      } catch (err) {
        console.error("PDF parsing error:", err);
        return res.status(400).json({ message: "Failed to parse resume PDF" });
      }
    }

    // ---------------- UPDATE DB ----------------
    const updatedProfile = await StudentProfile.findOneAndUpdate(
      { userId },
      {
        age: req.body.age,
        personalEmail: req.body.personalEmail,
        education: req.body.education,
        currentOccupation: req.body.currentOccupation,
        skills: req.body.skills
          ? req.body.skills.split(",").map(s => s.trim())
          : [],
        experience: req.body.experience,
        cgpa: req.body.cgpa,

        ...(resumeFileName && { resume: `uploads/resumes/${resumeFileName}` }),
        ...(resumeText && { resumeText })
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Profile update failed" });
  }
};

// ---------------- CHECK ELIGIBILITY ----------------
exports.checkEligibility = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ eligible: false, reason: "Job not found" });
    }

    const profile = await StudentProfile.findOne({ userId: studentId });
    if (!profile || !profile.resumeText) {
      return res.json({
        eligible: false,
        reason: "Resume not uploaded"
      });
    }

    // TODO: Add skill + CGPA checks here if needed

    return res.json({
      eligible: true,
      reason: "Profile updated & resume parsed successfully"
    });
  } catch (error) {
    console.error("Eligibility Check Error:", error);
    res.status(500).json({
      eligible: false,
      reason: "Eligibility check failed"
    });
  }
};
