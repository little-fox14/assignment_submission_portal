
const express = require('express');
const { body, validationResult } = require('express-validator'); 
const multer = require('multer'); // Assuming you want to upload files
const { protect } = require('../middlewares/authMiddleware.js');
const { uploadAssignment } = require('../controllers/AssignmentController.js');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Add a timestamp to the file name
  },
});

const upload = multer({ storage: storage }); // Create the multer instance

router.post(
  '/upload',
  [
    //protect, // Protect the route with authentication
    upload.single('assignmentFile'), // Handle single file upload with field name 'assignmentFile'
    body('task').notEmpty().withMessage('Task is required.'), // Validate that 'task' is not empty
    body('adminId').notEmpty().withMessage('Admin ID is required.') // Validate that 'adminId' is not empty
  ],
  (req, res) => {
    const errors = validationResult(req); // Check if validation has any errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // If validation fails, return the errors
    }

    // Call the uploadAssignment function if validation is successful
    uploadAssignment(req, res);
  }
);

module.exports = router;

