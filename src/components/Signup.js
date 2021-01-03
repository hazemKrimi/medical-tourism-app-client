import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
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
import { patientSignup, doctorSignup, hotelSignup } from '../store/actions';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Signup = ({ isOpen, onClose }) => {
	const [type, setType] = useState('patient');
	const { loading, error } = useSelector(state => state);
	const dispatch = useDispatch();
	const history = useHistory();

	const form = useFormik({
		initialValues: {
			...(['patient', 'doctor'].includes(type) && { firstname: '' }),
			...(['patient', 'doctor'].includes(type) && { lastname: '' }),
			...(type === 'patient' && { age: 18 }),
			...(type === 'patient' && { gender: 'other' }),
			...(type === 'doctor' && { speciality: '' }),
			...(['hotel', 'doctor'].includes(type) && { price: 0 }),
			...(type === 'hotel' && { photo: null }),
			...(type === 'hotel' && { name: '' }),
			phone: 0,
			address: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		validationSchema: Yup.object().shape({
			phone: Yup.number().required('Phone is required'),
			address: Yup.string().required('Address is required'),
			email: Yup.string().required('Email is required').email('Email is invalid'),
			password: Yup.string()
				.required('Password is required')
				.min(6, 'Password is 6 characters minimum'),
			confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Passwords don't match")
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
				password
			},
			{ setFieldError }
		) => {
			try {
				if (type === 'patient')
					dispatch(
						patientSignup(firstname, lastname, age, email, password, gender, address, phone)
					);
				if (type === 'doctor')
					dispatch(
						doctorSignup(firstname, lastname, email, password, address, phone, speciality, price)
					);
				if (type === 'hotel')
					dispatch(hotelSignup(name, email, password, address, phone, photo, price));
				onClose();
				history.push('/home');
			} catch {
				setFieldError('login', error);
			} finally {
				form.resetForm();
			}
		}
	});

	return (
		<form onSubmit={form.handleSubmit}>
			<Modal isOpen={isOpen} onClose={() => onClose()}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Signup</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Grid templateRows='auto' alignItems='center' rowGap={3}>
							<GridItem>
								<RadioGroup onChange={value => setType(value)} value={type}>
									<Stack direction='row'>
										<Radio value='patient'>Patient</Radio>
										<Radio value='doctor'>Doctor</Radio>
										<Radio value='hotel'>Hotel</Radio>
									</Stack>
								</RadioGroup>
							</GridItem>
							{type === 'hotel' && (
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
							{['patient', 'doctor'].includes(type) && (
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
							{['patient', 'doctor'].includes(type) && (
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
							{type === 'patient' && (
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
							{type === 'patient' && (
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
							{type === 'doctor' && (
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
							{type === 'hotel' && (
								<GridItem>
									<Input
										name='photo'
										placeholder='Photo'
										type='file'
										onChange={event => form.setFieldValue('photo', event.target.files[0])}
									/>
								</GridItem>
							)}
							{['hotel', 'doctor'].includes(type) && (
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
									name='password'
									placeholder='Password'
									type='password'
									value={form.values.password}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
							</GridItem>
							<GridItem>
								{form.errors.password && form.touched.password && (
									<Text color='tomato'>{form.errors.password}</Text>
								)}
							</GridItem>
							<GridItem>
								<Input
									name='confirmPassword'
									placeholder='Confirm Password'
									type='password'
									value={form.values.confirmPassword}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
							</GridItem>
							<GridItem>
								{form.errors.confirmPassword && form.touched.confirmPassword && (
									<Text color='tomato'>{form.errors.confirmPassword}</Text>
								)}
							</GridItem>
						</Grid>
					</ModalBody>
					<ModalFooter>
						{error && <Text color='tomato'>{error}</Text>}
						<ButtonGroup ml={2}>
							<Button type='submit' onClick={form.handleSubmit}>
								{loading ? <Spinner /> : 'Signup'}
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</form>
	);
};

export default Signup;
