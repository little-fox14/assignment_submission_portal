const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true,
    minlength:8
  },
  role: {
    type: String,
    enum: ['user','admin'],
    default: 'user'
  },
}, {
  timestamps: true
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next(); // Only hash if the password is modified
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with the stored password
};

const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
