import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../store/store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const reducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_REQUEST': {
			return { ...state, loadingUpdate: true };
		}

		case 'UPDATE_SUCCESS': {
			return { ...state, loadingUpdate: false };
		}

		case 'UPDATE_FAIL': {
			return { ...state, loadingUpdate: false };
		}

		default: {
			return state;
		}
	}
};

const ProfilePage = () => {
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { userInfo } = state;

	const [name, setName] = useState(userInfo.name);
	const [email, setEmail] = useState(userInfo.email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
		loadingUpdate: false,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('Please confirm your password!');
			return;
		}

		try {
			const { data } = await axios.put(
				`${process.env.REACT_APP_API_URL}/api/users/profile`,
				{ name, email, password },
				{
					headers: {
						authorization: `Bearer ${userInfo.token}`,
					},
				}
			);
			dispatch({ type: 'UPDATE_SUCCESS' });
			ctxDispatch({ type: 'USER_SIGNIN', payload: data });
			localStorage.setItem('userInfo', JSON.stringify(data));
			toast.success('User updated successfully');
		} catch (err) {
			dispatch({ type: 'FETCH_FAIL' });
			toast.error(getError(err));
		}
	};

	return (
		<div className='container small-container'>
			<Helmet>
				<title>User Profile</title>
			</Helmet>
			<h1 className='my-3'>User Profile</h1>
			<form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</Form.Group>
				<div className='mb-3'>
					<Button type='submit'>Update</Button>
				</div>
			</form>
		</div>
	);
};

export default ProfilePage;
