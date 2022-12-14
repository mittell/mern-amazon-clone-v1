import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../store/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../utils';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST': {
			return { ...state, loading: true, error: '' };
		}

		case 'FETCH_SUCCESS': {
			return { ...state, loading: false, orders: action.payload, error: '' };
		}

		case 'FETCH_FAIL': {
			return { ...state, loading: false, error: action.payload };
		}

		default: {
			return state;
		}
	}
};

const OrderHistoryPage = () => {
	const { state } = useContext(Store);
	const { userInfo } = state;

	const navigate = useNavigate();

	const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
		loading: true,
		errors: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' });
			try {
				const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/mine`, {
					headers: { authorization: `Bearer ${userInfo.token}` },
				});

				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({
					type: 'FETCH_FAIL',
					payload: getError(err),
				});
			}
		};

		fetchData();
	}, [userInfo]);

	return (
		<div>
			<Helmet>
				<title>Order History</title>
			</Helmet>
			<h1>Order History</h1>
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : (
				<table className='table'>
					<thead>
						<tr>
							<th>ID</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>{order.totalPrice.toFixed(0)}</td>
								<td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
								<td>
									{order.isDelivered
										? order.deliveredAt.substring(0, 10)
										: 'No'}
								</td>
								<td>
									<Button
										type='button'
										variant='light'
										onClick={() => {
											navigate(`/orders/${order._id}`);
										}}
									>
										Details
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default OrderHistoryPage;
