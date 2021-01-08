import express from 'express';

import {
    createAdmin, register, signIn, update,
} from '../controllers/userController.js';
import isAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/createadmin', createAdmin);

router.post('/signin', signIn);

router.post('/register', register);

router.put('/:id', isAuth, update);

export default router;
