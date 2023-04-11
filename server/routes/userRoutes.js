const express = require('express');
const { signup, signin, getAllUsers } = require('../controllers/userController');
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route('/signin').post(signin);
router.route('/signup').post(signup);

// get all users or specific user
router.route("/").get(protect, getAllUsers);

module.exports = router;