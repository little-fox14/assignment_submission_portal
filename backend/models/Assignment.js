const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    task: {
        type: String,
        required: true,
        trim: true  
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
        index: true  
    }
}, { 
    timestamps: true,  
    collection: "assignments" 
});



//  Added a method to check status
assignmentSchema.methods.isPending = function() {
    return this.status === 'pending';
};

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;