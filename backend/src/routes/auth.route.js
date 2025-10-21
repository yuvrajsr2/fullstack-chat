import express from 'express';
import { login, signup, logout, updateProfile, checkAuth} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router=express.Router();

//singup login and logout routes that go to the auth.controller.js file functions when you visist this url like /api/auth/signup
router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);


router.put("/update-profile", protectRoute,updateProfile);


router.get('/check', protectRoute, checkAuth);




export default router;