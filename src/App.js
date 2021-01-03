import { Container } from '@chakra-ui/react';
import { Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';

const App = () => {
	return (
		<Container maxWidth='85%'>
			<Nav />
			<Switch>
				<AuthRoute exact path='/'>
					<Landing />
				</AuthRoute>
				<ProtectedRoute exact path='/home'>
					<Home />
				</ProtectedRoute>
				<ProtectedRoute exact path='/settings'>
					<Settings />
				</ProtectedRoute>
			</Switch>
		</Container>
	);
};

export default App;
