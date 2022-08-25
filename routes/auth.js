const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
/* POST for signup. */
router.post('/signup', authController.signup);
/* POST - for login */
router.post('/login', authController.login );
module.exports = router;