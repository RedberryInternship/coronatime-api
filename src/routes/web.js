import express from 'express';
const router = express.Router();
import { confirmAccount } from '../controllers/auth-controller.js';

router.get('/confirm-account', confirmAccount);

export default router;
