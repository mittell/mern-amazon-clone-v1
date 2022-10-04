import './App.css';
import { useContext, useEffect, useState } from 'react';
import { Store } from './store/store';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getError } from './utils';
import axios from 'axios';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

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
import SearchBox from './components/SearchBox';

function App() {
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart, userInfo } = state;
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
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

	const handleSignOut = () => {
		ctxDispatch({ type: 'USER_SIGNOUT' });
		localStorage.removeItem('userInfo');
		localStorage.removeItem('shippingAddress');
		localStorage.removeItem('paymentMethod');
		window.location.href = '/signin';
	};

	return (
		<BrowserRouter>
			<div
				className={
					sidebarIsOpen
						? 'd-flex flex-column site-container active-cont'
						: 'd-flex flex-column site-container'
				}
			>
				<ToastContainer position='bottom-center' limit={1} />{' '}
				<header>
					<Navbar bg='dark' variant='dark' expand='lg'>
						<Container>
							<Button
								variant='dark'
								onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
							>
								<i className='fas fa-bars'></i>
							</Button>
							<LinkContainer to='/'>
								<Navbar.Brand>amazon</Navbar.Brand>
							</LinkContainer>
							<Navbar.Toggle aria-controls='basic-navbar-nav' />
							<Navbar.Collapse id='basic-navbar-nav'>
								<SearchBox />
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
				<div
					className={
						sidebarIsOpen
							? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
							: 'side-navbar d-flex justify-content-between flex-wrap flex-column'
					}
				>
					<Nav className='flex-column text-white w-100 p-2'>
						<Nav.Item>
							<strong>Categories</strong>
							{categories.map((category) => (
								<Nav.Item key={category}>
									<LinkContainer
										to={`/search?category=${category}`}
										onClick={() => setSidebarIsOpen(false)}
									>
										<Nav.Link>{category}</Nav.Link>
									</LinkContainer>
								</Nav.Item>
							))}
						</Nav.Item>
					</Nav>
				</div>
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
