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
        reason: "Resume not uploaded",
        type: "NO_RESUME"
      });
    }

    // ---------------- HARD RULES ----------------

    // ✅ CGPA CHECK
    if (
      job.requirements?.minCGPA &&
      profile.cgpa < job.requirements.minCGPA
    ) {
      return res.json({
        eligible: false,
        reason: `CGPA ${profile.cgpa} is below required ${job.requirements.minCGPA}`,
        type: "LOW_CGPA"
      });
    }

    // ✅ SKILLS CHECK
    const requiredSkills = job.requirements?.skills || [];
    const resumeTextLower = profile.resumeText.toLowerCase();

    const missingSkills = requiredSkills.filter(
      skill => !resumeTextLower.includes(skill.toLowerCase())
    );

    if (missingSkills.length > 0) {
      return res.json({
        eligible: false,
        reason: `Missing skills: ${missingSkills.join(", ")}`,
        type: "MISSING_SKILLS",
        missingSkills
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

    const score = hfResponse.data[0];

    if (score < 0.40) {
      return res.json({
        eligible: false,
        reason: `AI similarity score too low (${score.toFixed(2)})`,
        type: "LOW_AI_SCORE"
      });
    }

    // ---------------- FINAL PASS ----------------
    return res.json({
      eligible: true,
      score,
      reason: `Eligible ✅ (AI score ${score.toFixed(2)})`
    });

  } catch (err) {
    console.error("AI Eligibility Error:", err.response?.data || err.message);
    res.status(500).json({
      eligible: false,
      reason: "AI eligibility check failed"
    });
  }
};
