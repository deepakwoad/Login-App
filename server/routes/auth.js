const express = require('express');
const { register, login } = require('../controllers/authcontroller');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

//Registration Route
router.post('/register', rateLimiter, register);

//Login Route
router.post('/login', rateLimiter, login);

module.exports = router;