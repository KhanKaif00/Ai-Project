import { Router } from 'express';
import * as usercontroller from '../controllers/user.controller.js'; // Ensure the path is correct
import { body } from 'express-validator';
import  * as authMiddleware from "../middlewares/auth.middleware.js"

const router = Router();

router.post(
  '/register',
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
  usercontroller.createUserController
);
router.post('/login',
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
  usercontroller.loginController
)

router.get("/profile", authMiddleware.authUser, usercontroller.profileController);
//profile route ek logged in user hi access kar skta hai is liye hame ek middleware bana na padega taaki ye bata sake ki ye authenticated user hai

router.get('/logout',authMiddleware.authUser,usercontroller.logoutController)

router.get('/all',authMiddleware.authUser,usercontroller.getAllUserController)


export default router;
