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
	Text
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions';
import { useHistory } from 'react-router-dom';

const Login = ({ isOpen, onClose }) => {
	const { loading, error } = useSelector(state => state);
	const dispatch = useDispatch();
	const history = useHistory();

	const form = useFormik({
		initialValues: {
			email: '',
			password: '',
			type: 'patient'
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().required('Email is required').email('Email is invalid'),
			password: Yup.string()
				.required('Password is required')
				.min(6, 'Password is 6 characters minimum'),
			type: Yup.string().required('User type is required').oneOf(['patient', 'hotel', 'doctor'])
		}),
		onSubmit: ({ email, password, type }, { setFieldError }) => {
			try {
				dispatch(login(email, password, type));
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
					<ModalHeader>Login</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Grid templateRows='auto' alignItems='center' rowGap={3}>
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
								<RadioGroup
									name='type'
									onChange={value => form.setFieldValue('type', value)}
									value={form.values.type}
								>
									<Stack direction='row'>
										<Radio value='patient'>Patient</Radio>
										<Radio value='doctor'>Doctor</Radio>
										<Radio value='hotel'>Hotel</Radio>
									</Stack>
								</RadioGroup>
							</GridItem>
							<GridItem>
								{form.errors.type && form.touched.type && (
									<Text color='tomato'>{form.errors.type}</Text>
								)}
							</GridItem>
						</Grid>
					</ModalBody>
					<ModalFooter>
						{error && <Text color='tomato'>{error}</Text>}
						<ButtonGroup ml={2}>
							<Button type='submit' onClick={form.handleSubmit}>
								{loading ? <Spinner /> : 'Login'}
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</form>
	);
};

export default Login;
