const express = require('express');
const { registerController } = require('../controllers/registerController');

const router = express.Router();

// send user registered data to the backend
router.post("/register",registerController)


module.exports = router;