const express = require('express');
const passport = require('passport')
const { signup, login, googleCallback } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);



module.exports = router;
