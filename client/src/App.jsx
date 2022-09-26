import './App.css';
import { useContext } from 'react';
import { Store } from './store/store';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
	const { state } = useContext(Store);
	const { cart } = state;

	return (
		<BrowserRouter>
			<div className='d-flex flex-column site-container'>
				<header>
					<Navbar bg='dark' variant='dark'>
						<Container>
							<LinkContainer to='/'>
								<Navbar.Brand>amazon</Navbar.Brand>
							</LinkContainer>
							<Nav className='me-auto'>
								<Link to='/cart' className='nav-link'>
									Cart{' '}
									{cart.cartItems.length > 0 && (
										<Badge pill bg='danger'>
											{cart.cartItems.length}
										</Badge>
									)}
								</Link>
							</Nav>
						</Container>
					</Navbar>
				</header>
				<main>
					<Container className='mt-3'>
						<Routes>
							<Route path='/product/:slug' element={<ProductPage />} />
							<Route path='/' element={<HomePage />} />
						</Routes>
					</Container>
				</main>
				<footer>
					<div className='text-center'>All Rights Reserved</div>
				</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
