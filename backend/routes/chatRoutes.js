const express = require("express");
const router = express.Router();

router.post("/chat", async (req, res) => {

  const { message } = req.body;

  if (!message) {
    return res.json({ reply: "Please ask a question." });
  }

  const text = message.toLowerCase();

  let reply = "Sorry, I couldn't understand that. Try asking about jobs, internships, resume, or profile.";

  // greetings
  if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
    reply = "Hello 👋 How can I help you with placements today?";
  }

  // apply job
  else if (text.includes("apply")) {
    reply = "To apply for a job, go to the Available Jobs page and click the Apply button.";
  }

  // internships
  else if (text.includes("internship")) {
    reply = "You can find internships in the Available Jobs section by selecting the Internship filter.";
  }

  // jobs
  else if (text.includes("job")) {
    reply = "Students can view all available jobs in the Available Jobs section on the homepage.";
  }

  // resume
  else if (text.includes("resume") || text.includes("cv")) {
    reply = "You can upload or update your resume in the Profile section.";
  }

  // profile
  else if (text.includes("profile")) {
    reply = "You can update your profile details like skills and resume in the Profile page.";
  }

  // applied jobs
  else if (text.includes("applied")) {
    reply = "You can see all jobs you applied for in the Applied Jobs section.";
  }

  // dashboard
  else if (text.includes("dashboard")) {
    reply = "Your dashboard shows your activity including applied jobs and profile information.";
  }

  // recruiter questions
  else if (text.includes("post job") || text.includes("recruiter")) {
    reply = "Recruiters can post new jobs from the Recruiter Dashboard using the Post Job page.";
  }

  // applicants
  else if (text.includes("applicant")) {
    reply = "Recruiters can view applicants for their posted jobs in the View Applicants page.";
  }

  // admin
  else if (text.includes("admin")) {
    reply = "Admins manage users, learning topics, and monitor the platform through the Admin Dashboard.";
  }

  // learning section
  else if (text.includes("learning") || text.includes("course") || text.includes("study")) {
    reply = "You can access learning resources and topics in the Learning section.";
  }

  // thank you
  else if (text.includes("thank")) {
    reply = "You're welcome 😊 Let me know if you need help with anything else.";
  }

  res.json({ reply });

});

module.exports = router;
