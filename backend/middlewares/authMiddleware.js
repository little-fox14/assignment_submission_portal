const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const authMiddleware = {
  protect: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'No token provided. Authorization denied.' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found. Authorization denied.' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error.message);
      res.status(401).json({ message: 'Token verification failed. Authorization denied.' });
    }
  },

  admin: (req, res, next) => {
    if (req.user?.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  },
};

module.exports = authMiddleware;
