import express from 'express';
import { Country } from '../models/index.js';

const router = express.Router();

router.get('/countries', async (req, res) => {
  const data = await Country.find();
  res.json(data);
});

export default router;
