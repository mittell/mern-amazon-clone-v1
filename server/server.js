import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';

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

app.get('/api/products', (req, res) => {
	res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
	const product = data.products.find((p) => p._id === req.params.id);

	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: 'Product Not Found' });
	}
});

app.get('/api/products/slug/:slug', (req, res) => {
	const product = data.products.find((p) => p.slug === req.params.slug);

	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: 'Product Not Found' });
	}
});

app.listen(port, () => {
	console.log(`Server listening on Port: ${port}`);
});
