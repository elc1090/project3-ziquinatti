import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaBase from 'pages/PaginaBase';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import UsuarioProvider from 'context/Usuario';
import JogosProvider from 'context/Jogos';
import Jogar from 'pages/Jogar';
import JogarProvider from 'context/Jogar';

function AppRoutes() {
	return (
		// <BrowserRouter basename={process.env.PUBLIC_URL}>
		<BrowserRouter>
			<UsuarioProvider>
				<JogosProvider>
					<JogarProvider>
						<Routes>
							<Route path='/' element={<PaginaBase />}>
								<Route index element={<Home />}/>
								<Route path='/profile' element={<Profile />}/>
								<Route path='/jogar' element={<Jogar />}/>
							</Route>
						</Routes>
					</JogarProvider>
				</JogosProvider>
			</UsuarioProvider>
		</BrowserRouter>
	);
}

export default AppRoutes;
