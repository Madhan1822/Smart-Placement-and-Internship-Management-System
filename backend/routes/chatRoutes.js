const express = require("express");
const router = express.Router();

router.post("/chat", async (req, res) => {

  const { message } = req.body;

  let reply = "I'm not sure about that.";

  if (message.toLowerCase().includes("apply")) {
    reply = "Go to Available Jobs and click Apply.";
  }

  if (message.toLowerCase().includes("resume")) {
    reply = "Upload resume in your profile page.";
  }

  if (message.toLowerCase().includes("job")) {
    reply = "Students can view jobs in Available Jobs section.";
  }

  res.json({ reply });

});

module.exports = router;