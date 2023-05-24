import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaBase from 'pages/PaginaBase';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import UsuarioProvider from 'context/Usuario';
import JogosProvider from 'context/Jogos';
import ToPlay from 'pages/ToPlay';
import ToPlayProvider from 'context/ToPlay';

function AppRoutes() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<UsuarioProvider>
				<JogosProvider>
					<ToPlayProvider>
						<Routes>
							<Route path='/' element={<PaginaBase />}>
								<Route index element={<Home />}/>
								<Route path='/profile' element={<Profile />}/>
								<Route path='/toplay' element={<ToPlay />}/>
							</Route>
						</Routes>
					</ToPlayProvider>
				</JogosProvider>
			</UsuarioProvider>
		</BrowserRouter>
	);
}

export default AppRoutes;
