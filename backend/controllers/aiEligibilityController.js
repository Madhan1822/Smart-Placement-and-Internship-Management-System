const axios = require("axios");
const Job = require("../models/Job");
const StudentProfile = require("../models/StudentProfile");

const HF_API_URL =
  "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2";

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

exports.checkEligibilityAI = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { jobId } = req.body;

    const reasons = [];

    // ---------------- FETCH JOB ----------------
    const job = await Job.findById(jobId);
    if (!job) {
      return res.json({ eligible: false, reason: "Job not found" });
    }

    // ---------------- FETCH STUDENT PROFILE ----------------
    const profile = await StudentProfile.findOne({ userId: studentId });
    if (!profile || !profile.resumeText) {
      return res.json({
        eligible: false,
        reason: "Resume not uploaded"
      });
    }

    // ---------------- HARD RULES ----------------

    // ✅ CGPA CHECK
    if (job.requirements?.minCGPA && profile.cgpa < job.requirements.minCGPA) {
      reasons.push(
        `CGPA ${profile.cgpa} is below required ${job.requirements.minCGPA}`
      );
    }

    // ✅ SKILLS CHECK using resume text
    const requiredSkills = job.requirements?.skills || [];
    const resumeTextLower = profile.resumeText.toLowerCase();

    const missingSkills = requiredSkills.filter(
      skill => !resumeTextLower.includes(skill.toLowerCase())
    );

    if (missingSkills.length > 0) {
      reasons.push(`Missing skills: ${missingSkills.join(", ")}`);
    }

    // ❌ FAIL FAST if hard rules fail
    if (reasons.length > 0) {
      return res.json({
        eligible: false,
        reason: reasons.join(" | ")
      });
    }

    // ---------------- AI SIMILARITY CHECK ----------------
    const jobText = `
      Job Title: ${job.title}
      Company: ${job.company}
      Skills: ${requiredSkills.join(", ")}
      Description: ${job.description}
      Experience: ${job.requirements?.experience || ""}
    `;

    const hfResponse = await axios.post(
      HF_API_URL,
      {
        inputs: {
          source_sentence: profile.resumeText,
          sentences: [jobText]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    // HF returns array of similarity scores
    const score = hfResponse.data[0];

    // AI threshold (you can adjust)
    if (score < 0.45) {
      return res.json({
        eligible: false,
        reason: `AI similarity score too low (${score.toFixed(2)})`
      });
    }

    // ---------------- FINAL PASS ----------------
    return res.json({
      eligible: true,
      score,
      reason: `Eligible ✅ (AI score ${score.toFixed(2)}, CGPA & skills matched)`
    });

  } catch (err) {
    console.error("AI Eligibility Error:", err.response?.data || err.message);
    res.status(500).json({
      eligible: false,
      reason: "AI eligibility check failed"
    });
  }
};
