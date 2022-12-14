import bcrypt from 'bcryptjs';

const data = {
	users: [
		{
			name: 'Dummy',
			email: 'dummy@dummy.com',
			password: bcrypt.hashSync('dummy'),
			isAdmin: true,
		},
		{
			name: 'User',
			email: 'user@dummy.com',
			password: bcrypt.hashSync('user'),
			isAdmin: false,
		},
	],
	products: [
		{
			// _id: '1',
			name: 'Nike Slim Shirt',
			slug: 'nike-slim-shirt',
			category: 'Shirts',
			image: '/images/p1.jpg',
			price: 1200,
			countInStock: 10,
			brand: 'Nike',
			rating: 4.5,
			numReviews: 10,
			description: 'High Quality Shirt',
		},
		{
			// _id: '2',
			name: 'Adidas Slim Shirt',
			slug: 'adidas-slim-shirt',
			category: 'Shirts',
			image: '/images/p2.jpg',
			price: 2500,
			countInStock: 20,
			brand: 'Adidas',
			rating: 4.0,
			numReviews: 10,
			description: 'High Quality Product',
		},
		{
			// _id: '3',
			name: 'Nike Slim Pants',
			slug: 'nike-slim-pants',
			category: 'Pants',
			image: '/images/p3.jpg',
			price: 2500,
			countInStock: 15,
			brand: 'Nike',
			rating: 4.5,
			numReviews: 14,
			description: 'High Quality Product',
		},
		{
			// _id: '4',
			name: 'Puma Fit Pants',
			slug: 'puma-fit-pants',
			category: 'Pants',
			image: '/images/p4.jpg',
			price: 6500,
			countInStock: 0,
			brand: 'Puma',
			rating: 4.5,
			numReviews: 10,
			description: 'High Quality Product',
		},
	],
};

export default data;
