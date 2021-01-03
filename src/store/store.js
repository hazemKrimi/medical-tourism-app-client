import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducer, loadingReducer, errorReducer } from './reducers';

export default configureStore({
	reducer: combineReducers({
		user: userReducer,
		loading: loadingReducer,
		error: errorReducer
	})
});
