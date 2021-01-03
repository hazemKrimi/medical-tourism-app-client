import { addUser, removeUser, startLoading, stopLoading, setError, unsetError } from './reducers';

export const login = (email, password, type) => async dispatch => {
	try {
		dispatch(unsetError());
		dispatch(startLoading());
		const res = await fetch(`${process.env.REACT_APP_SERVER}/login/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password, type })
		});
		if (!res.ok) throw await res.json();
		const data = await res.json();
		dispatch(addUser({ type: data[0].model.split('.')[1], id: data[0].pk, ...data[0].fields }));
		dispatch(stopLoading());
	} catch (err) {
		dispatch(stopLoading());
		dispatch(setError(err.message));
	}
};

export const logout = () => async dispatch => {
	try {
		dispatch(unsetError());
		dispatch(startLoading());
		dispatch(removeUser());
		dispatch(stopLoading());
	} catch (err) {
		dispatch(stopLoading());
		dispatch(setError(err.message));
	}
};

export const patientSignup = (
	firstname,
	lastname,
	age,
	email,
	password,
	gender,
	address,
	phone
) => async dispatch => {
	try {
		dispatch(unsetError());
		dispatch(startLoading());
		const res = await fetch(`${process.env.REACT_APP_SERVER}/patient/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstname, lastname, age, email, password, gender, address, phone })
		});
		if (!res.ok) throw await res.json();
		const data = await res.json();
		dispatch(addUser({ type: 'patient', ...data }));
		dispatch(stopLoading());
	} catch (err) {
		dispatch(stopLoading());
		dispatch(setError(err.message));
	}
};

export const doctorSignup = (
	firstname,
	lastname,
	email,
	password,
	address,
	phone,
	speciality,
	price
) => async dispatch => {
	try {
		dispatch(unsetError());
		dispatch(startLoading());
		const res = await fetch(`${process.env.REACT_APP_SERVER}/doctor/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				firstname,
				lastname,
				email,
				password,
				address,
				phone,
				speciality,
				price
			})
		});
		if (!res.ok) throw await res.json();
		const data = await res.json();
		dispatch(addUser({ type: 'doctor', ...data }));
		dispatch(stopLoading());
	} catch (err) {
		dispatch(stopLoading());
		dispatch(setError(err.message));
	}
};

export const hotelSignup = (
	name,
	email,
	password,
	address,
	phone,
	photo,
	price
) => async dispatch => {
	try {
		dispatch(unsetError());
		dispatch(startLoading());
		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('address', address);
		formData.append('phone', phone);
		formData.append('photo', photo);
		formData.append('price', price);
		const res = await fetch(`${process.env.REACT_APP_SERVER}/hotel/`, {
			method: 'POST',
			body: formData
		});
		if (!res.ok) throw await res.json();
		const data = await res.json();
		dispatch(addUser({ type: 'hotel', ...data }));
		dispatch(stopLoading());
	} catch (err) {
		dispatch(stopLoading());
		dispatch(setError(err.message));
	}
};

export const updatePatient = (
	firstname,
	lastname,
	age,
	email,
	password,
	gender,
	address,
	phone
) => async (dispatch, getState) => {
	try {
		dispatch(unsetError());
		dispatch(startLoading());
		const { user } = getState();
		const res = await fetch(`${process.env.REACT_APP_SERVER}/patient/${user.id}/`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstname, lastname, age, email, password, gender, address, phone })
		});
		if (!res.ok) throw await res.json();
		const data = await res.json();
		dispatch(addUser({ type: 'patient', ...data }));
		dispatch(stopLoading());
	} catch (err) {
		dispatch(stopLoading());
		dispatch(setError(err.message));
	}
};

export const updateDoctor = (
	firstname,
	lastname,
	email,
	password,
	address,
	phone,
	speciality,
	price
) => async (dispatch, getState) => {
	try {
		dispatch(unsetError());
		dispatch(startLoading());
		const { user } = getState();
		const res = await fetch(`${process.env.REACT_APP_SERVER}/doctor/${user.id}/`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				firstname,
				lastname,
				email,
				password,
				address,
				phone,
				speciality,
				price
			})
		});
		if (!res.ok) throw await res.json();
		const data = await res.json();
		dispatch(addUser({ type: 'doctor', ...data }));
		dispatch(stopLoading());
	} catch (err) {
		dispatch(stopLoading());
		dispatch(setError(err.message));
	}
};

export const updateHotel = (name, email, password, address, phone, photo, price) => async (
	dispatch,
	getState
) => {
	try {
		dispatch(unsetError());
		dispatch(startLoading());
		const { user } = getState();
		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('address', address);
		formData.append('phone', phone);
		formData.append('photo', photo);
		formData.append('price', price);
		const res = await fetch(`${process.env.REACT_APP_SERVER}/hotel/${user.id}/`, {
			method: 'PUT',
			body: formData
		});
		if (!res.ok) throw await res.json();
		const data = await res.json();
		dispatch(addUser({ type: 'hotel', ...data }));
		dispatch(stopLoading());
	} catch (err) {
		dispatch(stopLoading());
		dispatch(setError(err.message));
	}
};

export const deletePatient = () => async (dispatch, getState) => {
	try {
		dispatch(unsetError());
		dispatch(startLoading());
		const { user } = getState();
		await fetch(`${process.env.REACT_APP_SERVER}/patient/${user.id}/`, {
			method: 'DELETE'
		});
		dispatch(removeUser());
		dispatch(stopLoading());
	} catch (err) {
		dispatch(stopLoading());
		dispatch(setError(err.message));
	}
};

export const deleteDoctor = () => async (dispatch, getState) => {
	try {
		dispatch(unsetError());
		dispatch(startLoading());
		const { user } = getState();
		await fetch(`${process.env.REACT_APP_SERVER}/doctor/${user.id}/`, {
			method: 'DELETE'
		});
		dispatch(removeUser());
		dispatch(stopLoading());
	} catch (err) {
		dispatch(stopLoading());
		dispatch(setError(err.message));
	}
};

export const deleteHotel = () => async (dispatch, getState) => {
	try {
		dispatch(unsetError());
		dispatch(startLoading());
		const { user } = getState();
		await fetch(`${process.env.REACT_APP_SERVER}/hotel/${user.id}/`, {
			method: 'DELETE'
		});
		dispatch(removeUser());
		dispatch(stopLoading());
	} catch (err) {
		dispatch(stopLoading());
		dispatch(setError(err.message));
	}
};
