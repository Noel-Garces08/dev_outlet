import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import products from './products.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Middlewares
import { errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(({ _id }) => _id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found!' });
    }
});

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/paypal/clientId', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.use(errorHandler);

app.listen(5000, () => console.log('Server running at http://localhost:5000'));
