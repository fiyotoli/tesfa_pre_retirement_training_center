import multer from "multer";
import path from "path";

// Set storage destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/docs'); // folder to store documents
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname; // avoid duplicates
    cb(null, uniqueName);
  },
});

// File type filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'text/plain', // .txt
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed'), false);
  }
};

// Set limits (optional)
const limits = {
  fileSize: 10 * 1024 * 1024, // 10 MB
};

// Create the multer upload instance
const uploadDocument = multer({
  storage,
  fileFilter,
  limits,
});

// ✅ Export as default so it works with ES modules import
export default uploadDocument;
