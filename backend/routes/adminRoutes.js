const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware.js');
const { 
  getAssignments, 
  acceptAssignment, 
  rejectAssignment 
} = require('../controllers/adminController.js');

const router = express.Router();

// Protect and admin middleware applied to all routes
router.use(protect);
router.use(admin);

// Routes
router.get('/assignments', getAssignments);
router.post('/assignments/:id/accept', acceptAssignment);
router.post('/assignments/:id/reject', rejectAssignment);

module.exports = router;
