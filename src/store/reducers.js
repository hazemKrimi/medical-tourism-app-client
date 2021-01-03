import { createSlice } from '@reduxjs/toolkit';

const loadingInitialState = false;
const errorInitialState = '';
const userInitialState = null;

const loadingSlice = createSlice({
	name: 'loading',
	initialState: loadingInitialState,
	reducers: {
		startLoading: () => true,
		stopLoading: () => false
	}
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;

const errorSlice = createSlice({
	name: 'error',
	initialState: errorInitialState,
	reducers: {
		setError: (state, action) => action.payload,
		unsetError: () => ''
	}
});

export const { setError, unsetError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;

const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		addUser: (state, action) => action.payload,
		removeUser: () => userInitialState
	}
});

export const { addUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
