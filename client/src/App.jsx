import './App.css';
import { useContext } from 'react';
import { Store } from './store/store';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import SignUpPage from './pages/SignUpPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import OrderPage from './pages/OrderPage';

function App() {
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart, userInfo } = state;

	const handleSignOut = () => {
		ctxDispatch({ type: 'USER_SIGNOUT' });
		localStorage.removeItem('userInfo');
		localStorage.removeItem('shippingAddress');
		localStorage.removeItem('paymentMethod');
	};

	return (
		<BrowserRouter>
			<div className='d-flex flex-column site-container'>
				<ToastContainer position='bottom-center' limit={1} />{' '}
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
											{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
										</Badge>
									)}
								</Link>
								{userInfo ? (
									<NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
										<LinkContainer to='/profile'>
											<NavDropdown.Item>User Profile</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to='/orderhistory'>
											<NavDropdown.Item>Order History</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Divider />
										<Link
											className='dropdown-item'
											to='#signout'
											onClick={handleSignOut}
										>
											Sign Out
										</Link>
									</NavDropdown>
								) : (
									<Link className='nav-link' to='/signin'>
										Sign In
									</Link>
								)}
							</Nav>
						</Container>
					</Navbar>
				</header>
				<main>
					<Container className='mt-3'>
						<Routes>
							<Route path='/product/:slug' element={<ProductPage />} />
							<Route path='/cart' element={<CartPage />} />
							<Route path='/signin' element={<SignInPage />} />
							<Route path='/signup' element={<SignUpPage />} />
							<Route path='/shipping' element={<ShippingAddressPage />} />
							<Route path='/payment' element={<PaymentMethodPage />} />
							<Route path='/placeorder' element={<OrderPage />} />
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
