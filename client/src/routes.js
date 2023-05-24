import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaBase from 'pages/PaginaBase';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import UsuarioProvider from 'context/Usuario';
import JogosProvider from 'context/Jogos';

function AppRoutes() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<UsuarioProvider>
				<JogosProvider>
					<Routes>
						<Route path='/' element={<PaginaBase />}>
							<Route index element={<Home />}/>
							<Route path='/profile' element={<Profile />}/>
						</Route>
					</Routes>
				</JogosProvider>
			</UsuarioProvider>
		</BrowserRouter>
	);
}

export default AppRoutes;
