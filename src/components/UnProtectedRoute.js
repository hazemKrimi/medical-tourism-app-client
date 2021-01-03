import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UnProtectedRoute = ({ children, ...rest }) => {
	const user = useSelector(state => state.user);

	return <Route {...rest} render={() => (!user ? children : <Redirect to='/home' />)} />;
};

export default UnProtectedRoute;
