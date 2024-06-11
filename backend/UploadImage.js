import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// Set up storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// File upload endpoint
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ filePath: req.file.path });
});

export default router;