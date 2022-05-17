import express from 'express';
import { register, login } from '../controllers/auth-controller.js';
import { sendPasswordRecoveryMail } from '../controllers/password-recovery-controller.js';
import { getAllCountries } from '../controllers/countries-controller.js';
import { authMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/countries', authMiddleware, getAllCountries);
router.post('/register', register);
router.post('/login', login);
router.post('/password/send-recovery-link', sendPasswordRecoveryMail);

export default router;
