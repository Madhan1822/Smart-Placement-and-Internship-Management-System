const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(), // ✅ BUFFER
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files allowed"), false);
    }
    cb(null, true);
  }
});

module.exports = upload;
