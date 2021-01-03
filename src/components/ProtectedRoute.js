import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, ...rest }) => {
	const user = useSelector(state => state.user);

	return <Route {...rest} render={() => (user ? children : <Redirect to='/' />)} />;
};

export default ProtectedRoute;
