import express from 'express';
import {
  register,
  login,
  confirmAccount,
} from '../controllers/auth-controller.js';
import {
  sendPasswordRecoveryMail,
  recoverPassword,
} from '../controllers/password-recovery-controller.js';
import { getAllCountries } from '../controllers/countries-controller.js';
import { authMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/countries', authMiddleware, getAllCountries);
router.post('/register', register);
router.post('/login', login);
router.post('/confirm-account', confirmAccount);
router.post('/password/send-recovery-link', sendPasswordRecoveryMail);
router.post('/password/recover', recoverPassword);

export default router;
