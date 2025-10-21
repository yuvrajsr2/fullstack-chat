import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersforSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/users", protectRoute, getUsersforSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;