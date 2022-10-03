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
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';

function App() {
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart, userInfo } = state;

	const handleSignOut = () => {
		ctxDispatch({ type: 'USER_SIGNOUT' });
		localStorage.removeItem('userInfo');
		localStorage.removeItem('shippingAddress');
		localStorage.removeItem('paymentMethod');
		window.location.href = '/signin';
	};

	return (
		<BrowserRouter>
			<div className='d-flex flex-column site-container'>
				<ToastContainer position='bottom-center' limit={1} />{' '}
				<header>
					<Navbar bg='dark' variant='dark' expand='lg'>
						<Container>
							<LinkContainer to='/'>
								<Navbar.Brand>amazon</Navbar.Brand>
							</LinkContainer>
							<Navbar.Toggle aria-controls='basic-navbar-nav' />
							<Navbar.Collapse id='basic-navbar-nav'>
								<Nav className='me-auto w-100 justify-content-end'>
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
							</Navbar.Collapse>
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
							<Route path='/profile' element={<ProfilePage />} />
							<Route path='/shipping' element={<ShippingAddressPage />} />
							<Route path='/payment' element={<PaymentMethodPage />} />
							<Route path='/placeorder' element={<PlaceOrderPage />} />
							<Route path='/orders/:id' element={<OrderPage />} />
							<Route path='/orderhistory' element={<OrderHistoryPage />} />
							<Route path='/' element={<HomePage />} />
						</Routes>
					</Container>
				</main>
				<footer>
					<div className='text-center mb-4 mt-4'>
						Copyright &copy; 2022 Chris Mittell
					</div>
				</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
