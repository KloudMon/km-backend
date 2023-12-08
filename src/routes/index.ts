import express from 'express';
import users from './users/api';

const router = express.Router();

router.use('/users', users);

export default router;