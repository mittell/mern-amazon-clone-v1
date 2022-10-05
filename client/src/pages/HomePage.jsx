import React, { useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return { ...state, products: action.payload, loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

const HomePage = () => {
	const [{ loading, error, products }, dispatch] = useReducer(reducer, {
		products: [],
		loading: true,
		error: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' });
			try {
				const result = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<Helmet>
				<title>Shoppa</title>
			</Helmet>
			<h1>Featured Products</h1>
			<div className='products'>
				{loading ? (
					<LoadingBox />
				) : error ? (
					<MessageBox variant='danger'>{error}</MessageBox>
				) : (
					<Row>
						{products.map((product) => (
							<Col sm={6} md={4} lg={3} className='mb-3' key={product.slug}>
								<Product product={product} />
							</Col>
						))}
					</Row>
				)}
			</div>
		</>
	);
};

export default HomePage;
