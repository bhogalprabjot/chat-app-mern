const express = require('express');
const { signup, signin } = require('../controllers/userController');


const router = express.Router();

router.route('/signin').post(signin);
router.route('/signup').post(signup);

module.exports = router;