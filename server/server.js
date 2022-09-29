import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routes/productRoutes.js';
import seedRouter from './routes/seedRoutes.js';

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

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

app.listen(port, () => {
	console.log(`Server listening on Port: ${port}`);
});
