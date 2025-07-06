// user login logout currentuser
import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import currentUser from '../middlewares/currentUser';
import upload from '../middlewares/upload';
import { body, query } from 'express-validator';

const router = express.Router();

// TODO: USER EXPRESS VALIDATOR

router.post('/auth/signup', 
        upload.single('file'),
        [
        body('email')
            .isEmail()
            .withMessage('EMail must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password'),
        body('userName')
            .trim()
            .notEmpty()
            .withMessage('You must supply a userName')
    ],
    AuthController.signup);

router.post('/auth/signin', 
        [
        body('email')
            .isEmail()
            .withMessage('EMail must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
    AuthController.signin);

// verify email
router.get('/auth/verify', AuthController.verifyEmail);

// send reset password mail
router.post('/auth/reset-mail', AuthController.sendResetPasswordMail);

// reset password
router.post('/auth/reset', [
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password'),
        query('token').isString().notEmpty().withMessage('Token is required in query')
    ],
    AuthController.resetPassword);

router.get('/auth/signout', AuthController.signout);

router.get('/auth/currentuser', currentUser, AuthController.currentUser);

export default router;

