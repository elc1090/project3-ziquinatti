import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaBase from 'pages/PaginaBase';
import Home from 'pages/Home';
import Profile from 'pages/Profile';

function AppRoutes() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Routes>
				<Route path='/' element={<PaginaBase />}>
					<Route index element={<Home />}/>
					<Route path='/profile' element={<Profile />}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
