import express from 'express';
import { createOrder, getOrder, getMyOrders, updateOrderState } from './../controllers/orderController.js';
import isAuth from './../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuth, createOrder);

router.get('/:id', isAuth, getOrder);

router.get('/', isAuth, getMyOrders);

router.put('/:id/pay', isAuth, updateOrderState);

export default router;