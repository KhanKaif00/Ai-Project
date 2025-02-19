import { Router } from 'express';
import * as usercontroller from '../controllers/user.controller.js'; // Ensure the path is correct
import { body } from 'express-validator';

const router = Router();

router.post(
  '/register',
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
  usercontroller.createUserController
);

export default router;
