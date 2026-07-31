const express  =require('express');
const router = express.Router();
const { regesterUser, loginUser, getUsers } = require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware.js');
const { admin } = require('../middleware/adminMiddlewaew.js');

router.post('/register',regesterUser);
router.post('/login',loginUser);
router.get('/users', protect, admin, getUsers); 


module.exports = router;