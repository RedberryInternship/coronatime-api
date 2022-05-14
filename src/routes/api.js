import express from 'express';
import { register, login } from '../controllers/auth-controller.js';
import { getAllCountries } from '../controllers/countries-controller.js';

const router = express.Router();

router.get('/countries', getAllCountries);
router.post('/register', register);
router.post('/login', login);

export default router;
