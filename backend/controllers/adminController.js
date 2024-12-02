const Assignment = require('../models/Assignment.js');


 // Retrieve assignments for the logged-in admin
 

const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ adminId: req.user._id })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({
      error: "Failed to fetch assignments",
      message: error.message,
    });
  }
};


 // Accept an assignment by its ID

const acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      {
        _id: req.params.id,
        adminId: req.user._id,
        status: { $ne: 'accepted' } // Prevent multiple acceptances
      },
      { status: 'accepted' },
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ 
        message: 'Assignment not found or already processed' 
      });
    }

    res.json(assignment);
  } catch (error) {
    console.error('Error accepting assignment:', error);
    res.status(500).json({ 
      error: "Failed to accept assignment",
      message: error.message 
    });
  }
};


 //Reject an assignment by its ID
 
const rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      {
        _id: req.params.id,
        adminId: req.user._id,
        status: { $ne: 'rejected' } // Prevent multiple rejections
      },
      { status: 'rejected' },
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ 
        message: 'Assignment not found or already processed' 
      });
    }

    res.json(assignment);
  } catch (error) {
    console.error('Error rejecting assignment:', error);
    res.status(500).json({ 
      error: "Failed to reject assignment",
      message: error.message 
    });
  }
};

module.exports = {
  getAssignments,
  acceptAssignment,
  rejectAssignment
};