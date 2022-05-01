import express from "express";
import {countries} from '../dummy.js'

const router = express.Router();

router.get('/countries', (req, res) => {
    res.json(countries);
});

export default router;
