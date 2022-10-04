import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getError } from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST': {
			return { ...state, loading: true };
		}

		case 'FETCH_SUCCESS': {
			return {
				...state,
				products: action.payload.products,
				page: action.payload.page,
				pages: action.payload.pages,
				productsCount: action.payload.productsCount,
				loading: false,
			};
		}

		case 'FETCH_FAIL': {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		}

		default: {
			return state;
		}
	}
};

const prices = [
	{
		name: '¥1 to ¥999',
		value: '1-999',
	},
	{
		name: '¥1000 to ¥4999',
		value: '1000-4999',
	},
	{
		name: '¥5000 to ¥9999',
		value: '5000-9999',
	},
];

const ratings = [
	{
		name: '4 stars & up',
		rating: 4,
	},
	{
		name: '3 stars & up',
		rating: 3,
	},
	{
		name: '2 stars & up',
		rating: 2,
	},
	{
		name: '1 star & up',
		rating: 1,
	},
];

const SearchPage = () => {
	const navigate = useNavigate();
	const { search } = useLocation();

	const sp = new URLSearchParams(search);
	const category = sp.get('category') || 'all';
	const query = sp.get('query') || 'all';
	const price = sp.get('price') || 'all';
	const rating = sp.get('rating') || 'all';
	const order = sp.get('order') || 'newest';
	const page = sp.get('page') || 1;

	const [{ loading, error, products, pages, productsCount }, dispatch] =
		useReducer(reducer, {
			loading: true,
			error: '',
		});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(
					`/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
				);

				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({
					type: 'FETCH_FAIL',
					payload: getError(err),
				});
			}
		};
	}, [category, order, page, price, query, rating]);

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const { data } = await axios.get(`/api/products/categories`);
				setCategories(data);
			} catch (err) {
				toast.error(getError(err));
			}
		};
		fetchCategories();
	}, []);

	const getFilterUrl = (filter) => {
		const filterPage = filter.page || page;
		const filterCategory = filter.category || category;
		const filterQuery = filter.query || query;
		const filterPrice = filter.price || price;
		const filterOrder = filter.order || order;
		const filterRating = filter.rating || rating;

		return `/search?page=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}`;
	};

	return (
		<div>
			<Helmet>
				<title>Search Products</title>
			</Helmet>
			<Row>
				<Col md={3}>
					<div>
						<h3>Department</h3>
						<ul>
							<li>
								<Link
									className={'all' === category ? 'text-bold' : ''}
									to={getFilterUrl({ category: 'all' })}
								>
									Any
								</Link>
							</li>
							{categories.map((c) => (
								<li key={c}>
									<Link
										className={c === category ? 'text-bold' : ''}
										to={getFilterUrl({ category: c })}
									>
										{c}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3>Price</h3>
						<ul>
							<li>
								<Link
									className={'all' === price ? 'text-bold' : ''}
									to={getFilterUrl({ price: 'all' })}
								>
									Any
								</Link>
							</li>
							{prices.map((p) => (
								<li key={p.value}>
									<Link
										className={p.value === price ? 'text-bold' : ''}
										to={getFilterUrl({ price: p.value })}
									>
										{p.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3>Avg. Customer Review</h3>
						<ul>
							{ratings.map((r) => (
								<li key={r.name}>
									<Link
										className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
										to={getFilterUrl({ rating: r.rating })}
									>
										<Rating caption={' & up'} rating={r.rating} />
									</Link>
								</li>
							))}
							<li>
								<Link
									className={rating === 'all' ? 'text-bold' : ''}
									to={getFilterUrl({ rating: 'all' })}
								>
									<Rating caption={' & up'} rating={0} />
								</Link>
							</li>
						</ul>
					</div>
				</Col>
				<Col md={9}>
					{loading ? (
						<LoadingBox />
					) : error ? (
						<MessageBox variant='danger'>{error}</MessageBox>
					) : (
						<>
							<Row className='justify-content-between mb-3'>
								<Col md={6}>
									<div>
										{productsCount === 0 ? 'No' : productsCount} Results
										{query !== 'all' && ` : ${query}`}
										{category !== 'all' && ` : ${category}`}
										{price !== 'all' && ` : Price ${price}`}
										{rating !== 'all' && ` : Rating ${rating} & up`}
										{query !== 'all' ||
										category !== 'all' ||
										rating !== 'all' ||
										price !== 'all' ? (
											<Button
												variant='light'
												onClick={() => navigate('/search')}
											>
												<i className='fas fa-times-circle'></i>
											</Button>
										) : null}
									</div>
								</Col>
								<Col className='text-end'>
									Sort By{' '}
									<select
										value={order}
										onChange={(e) => {
											navigate(getFilterUrl({ order: e.target.value }));
										}}
									>
										<option value='newest'>Newest Arrivals</option>
										<option value='lowest'>Price: Low to High</option>
										<option value='highest'>Price: High to Low</option>
										<option value='toprated'>Avg. Customer Reviews</option>
									</select>
								</Col>
							</Row>
							{products.length === 0 && (
								<MessageBox>No Products Found</MessageBox>
							)}
							<Row>
								{products.map((product) => (
									<Col sm={6} lg={4} className='mb-3' key={product._id}>
										<Product product={product} />
									</Col>
								))}
							</Row>
						</>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default SearchPage;
