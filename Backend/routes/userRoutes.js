const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/userController');
// route is api endpoint
router.route('/').post(registerUser); 

module.exports = router;