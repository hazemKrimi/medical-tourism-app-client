import {
	Heading,
	Box,
	Button,
	ButtonGroup,
	Input,
	Grid,
	GridItem,
	Spinner,
	Radio,
	RadioGroup,
	Stack,
	Text,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
	updatePatient,
	updateDoctor,
	updateHotel,
	deletePatient,
	deleteDoctor,
	deleteHotel
} from '../store/actions';
import { useHistory } from 'react-router-dom';

const Settings = () => {
	const { loading, error, user } = useSelector(state => state);
	const dispatch = useDispatch();
	const history = useHistory();

	const deleteUser = () => {
		if (user.type === 'patient') dispatch(deletePatient());
		if (user.type === 'doctor') dispatch(deleteDoctor());
		if (user.type === 'hotel') dispatch(deleteHotel());
		history.push('/');
	};

	const form = useFormik({
		initialValues: {
			...(['patient', 'doctor'].includes(user.type) && { firstname: user.firstname }),
			...(['patient', 'doctor'].includes(user.type) && { lastname: user.lastname }),
			...(user.type === 'patient' && { age: user.age }),
			...(user.type === 'patient' && { gender: user.gender }),
			...(user.type === 'doctor' && { speciality: user.speciality }),
			...(['hotel', 'doctor'].includes(user.type) && { price: user.price }),
			...(user.type === 'hotel' && { photo: null }),
			...(user.type === 'hotel' && { name: user.name }),
			phone: user.phone,
			address: user.address,
			email: user.email,
			newPassword: '',
			confirmNewPassword: ''
		},
		validationSchema: Yup.object().shape({
			phone: Yup.number().required('Phone is required'),
			address: Yup.string().required('Address is required'),
			email: Yup.string().required('Email is required').email('Email is invalid'),
			newPassword: Yup.string()
				.required('Password is required')
				.min(6, 'Password is 6 characters minimum'),
			confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], "Passwords don't match")
		}),
		onSubmit: (
			{
				firstname,
				lastname,
				age,
				gender,
				speciality,
				photo,
				price,
				name,
				address,
				phone,
				email,
				newPassword
			},
			{ setFieldError }
		) => {
			try {
				if (user.type === 'patient')
					dispatch(
						updatePatient(firstname, lastname, age, email, newPassword, gender, address, phone)
					);
				if (user.type === 'doctor')
					dispatch(
						updateDoctor(firstname, lastname, email, newPassword, address, phone, speciality, price)
					);
				if (user.type === 'hotel')
					dispatch(updateHotel(name, email, newPassword, address, phone, photo, price));
				history.push('/home');
			} catch {
				setFieldError('login', error);
			} finally {
				form.resetForm();
			}
		}
	});

	return (
		<Box my={5} py={5}>
			<Heading mb={3}>Settings</Heading>
			<form onSubmit={form.handleSubmit}>
				<Grid templateRows='auto' alignItems='center' rowGap={3}>
					{user.type === 'hotel' && (
						<GridItem>
							<Input
								name='name'
								placeholder='Name'
								value={form.values.name}
								type='text'
								onChange={form.handleChange}
								onBlur={form.handleBlur}
							/>
						</GridItem>
					)}
					{['patient', 'doctor'].includes(user.type) && (
						<GridItem>
							<Input
								name='firstname'
								placeholder='First Name'
								value={form.values.firstname}
								type='text'
								onChange={form.handleChange}
								onBlur={form.handleBlur}
							/>
						</GridItem>
					)}
					{['patient', 'doctor'].includes(user.type) && (
						<GridItem>
							<Input
								name='lastname'
								placeholder='Last Name'
								value={form.values.lastname}
								type='text'
								onChange={form.handleChange}
								onBlur={form.handleBlur}
							/>
						</GridItem>
					)}
					{user.type === 'patient' && (
						<GridItem>
							<NumberInput name='age' value={form.values.age}>
								<NumberInputField
									placeholder='Age'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</GridItem>
					)}
					{user.type === 'patient' && (
						<GridItem>
							<RadioGroup
								name='gender'
								onChange={value => form.setFieldValue('gender', value)}
								value={form.values.gender}
							>
								<Stack direction='row'>
									<Radio value='male'>Male</Radio>
									<Radio value='female'>female</Radio>
									<Radio value='other'>Other</Radio>
								</Stack>
							</RadioGroup>
						</GridItem>
					)}
					{user.type === 'doctor' && (
						<GridItem>
							<Input
								name='speciality'
								placeholder='Speciality'
								value={form.values.speciality}
								type='text'
								onChange={form.handleChange}
								onBlur={form.handleBlur}
							/>
						</GridItem>
					)}
					{user.type === 'hotel' && (
						<GridItem>
							<Input
								name='photo'
								placeholder='Photo'
								type='file'
								onChange={event => form.setFieldValue('photo', event.target.files[0])}
							/>
						</GridItem>
					)}
					{['hotel', 'doctor'].includes(user.type) && (
						<GridItem>
							<NumberInput name='price' value={form.values.price}>
								<NumberInputField
									placeholder='Price'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</GridItem>
					)}
					<GridItem>
						<Input
							name='address'
							placeholder='Address'
							value={form.values.address}
							type='text'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
						/>
					</GridItem>
					<GridItem>
						{form.errors.address && form.touched.address && (
							<Text color='tomato'>{form.errors.address}</Text>
						)}
					</GridItem>
					<GridItem>
						<NumberInput name='phone' value={form.values.phone}>
							<NumberInputField
								placeholder='Phone'
								onChange={form.handleChange}
								onBlur={form.handleBlur}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</GridItem>
					<GridItem>
						{form.errors.phone && form.touched.phone && (
							<Text color='tomato'>{form.errors.phone}</Text>
						)}
					</GridItem>
					<GridItem>
						<Input
							name='email'
							placeholder='Email'
							type='email'
							value={form.values.email}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
						/>
					</GridItem>
					<GridItem>
						{form.errors.email && form.touched.email && (
							<Text color='tomato'>{form.errors.email}</Text>
						)}
					</GridItem>
					<GridItem>
						<Input
							name='newPassword'
							placeholder='New Password'
							type='password'
							value={form.values.newPassword}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
						/>
					</GridItem>
					<GridItem>
						{form.errors.newPassword && form.touched.newPassword && (
							<Text color='tomato'>{form.errors.newPassword}</Text>
						)}
					</GridItem>
					<GridItem>
						<Input
							name='confirmNewPassword'
							placeholder='Confirm New Password'
							type='password'
							value={form.values.confirmNewPassword}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
						/>
					</GridItem>
					<GridItem>
						{form.errors.confirmNewPassword && form.touched.confirmNewPassword && (
							<Text color='tomato'>{form.errors.confirmNewPassword}</Text>
						)}
					</GridItem>
				</Grid>
				{error && <Text color='tomato'>{error}</Text>}
				<ButtonGroup>
					<Button colorScheme='blue' type='submit' onClick={form.handleSubmit}>
						{loading ? <Spinner /> : 'Update'}
					</Button>
					<Button colorScheme='red' onClick={deleteUser}>
						{loading ? <Spinner /> : 'Delete'}
					</Button>
				</ButtonGroup>
			</form>
		</Box>
	);
};

export default Settings;
