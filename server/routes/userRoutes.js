const express = require('express');
const { signup, signin, getAllUsers } = require('../controllers/userController');


const router = express.Router();

router.route('/signin').post(signin);
router.route('/signup').post(signup);

// get all users or specific user
router.route("/").get(getAllUsers);

module.exports = router;