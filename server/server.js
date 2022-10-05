import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import productRouter from './routes/productRoutes.js';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Connected to Database...');
	})
	.catch((err) => {
		console.log(err.message);
	});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/api/keys/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

app.listen(port, () => {
	console.log(`Server listening on Port: ${port}`);
});
