import { Container } from '@chakra-ui/react';
import { Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import UnProtectedRoute from './components/UnProtectedRoute';

const App = () => {
	return (
		<Container maxWidth={['100%', '85%']}>
			<Nav />
			<Switch>
				<UnProtectedRoute exact path='/'>
					<Landing />
				</UnProtectedRoute>
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
