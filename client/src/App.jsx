import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
	return (
		<BrowserRouter>
			<div className='d-flex flex-column site-container'>
				<header>
					<Navbar bg='dark' variant='dark'>
						<Container>
							<LinkContainer to='/'>
								<Navbar.Brand>amazon</Navbar.Brand>
							</LinkContainer>
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
