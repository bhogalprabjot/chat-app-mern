const express = require('express');
const { protect } = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createGroupChat, renameGroup ,removeFromGroup , addToGroup } = require("../controllers/chatController");
const router = express.Router();

// fetch existing specific chat or creates a new chat
router.route('/').post(protect, accessChat);

// fetch all chats for the user
router.route('/').get(protect, fetchChats);

// create a new group chat
router.route('/group').post(protect, createGroupChat);


router.route('/group').put(protect, renameGroup);
router.route('/group/remove').put(protect, removeFromGroup);
router.route('/group/add').put(protect, addToGroup);

module.exports = router;



