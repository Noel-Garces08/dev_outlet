import asycnHandler from 'express-async-handler';
import Order from './../models/orderModel.js';
const createOrder = asycnHandler(async (req, res) => {
    const order = await Order.create({
        ...req.body,
        user: req.user._id
    });
    res.status(201).send({ message: "New Order Created", order });
});

const getOrder = asycnHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.status(200).send(order);
    } else {
        res.status(401).send(({ message: 'Order Not Found' }));
    }
});

const getMyOrders = asycnHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).send(orders);
});

const updateOrderState = asycnHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment.paymentResult = {
            ...req.body
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
});

export { createOrder, getOrder, getMyOrders, updateOrderState };