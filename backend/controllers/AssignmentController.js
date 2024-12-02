const { validationResult } = require("express-validator");
const Assignment = require("../models/Assignment");
const mongoose = require("mongoose");

const uploadAssignment = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { task, adminId } = req.body;

    // Additional validation for adminId
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({
        message: "Invalid admin ID",
      });
    }

    // Create a new assignment
    const assignment = await Assignment.create({
      userId: req.user._id, 
      adminId,
      task,
    });

    res.status(201).json({
      message: "Assignment uploaded successfully",
      assignment: {
        _id: assignment._id,
        task: assignment.task,
        status: assignment.status,
        createdAt: assignment.createdAt
      },
    });
  } catch (error) {
    console.error("Assignment upload error:", error);

    // Handle specific Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A similar assignment already exists",
      });
    }

    res.status(500).json({
      message: "An error occurred while uploading the assignment",
      error: error.message,
    });
  }
};

module.exports = uploadAssignment;