import express from 'express';
import { getIndex, getItem } from '../controller/index.js';

const router = express.Router();

router.get('/api/', getIndex)
router.get('/api/:id', getItem)

export default router;