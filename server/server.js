import express from 'express';
import data from './data.js';

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
