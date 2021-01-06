import { Heading, Box, Grid, GridItem, Center, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatient, getDoctor, getHotel } from '../store/actions';
import Card from '../components/Card';

const Home = () => {
	const { user, loading } = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user.type === 'patient') dispatch(getPatient());
		if (user.type === 'doctor') dispatch(getDoctor());
		if (user.type === 'hotel') dispatch(getHotel());
	}, [user.type, dispatch]);

	return !loading ? (
		<Box my={5} py={5}>
			<Heading>
				Welcome{' '}
				{['patient', 'doctor'].includes(user.type)
					? `${user.firstname} ${user.lastname}`
					: user.name}
			</Heading>
			<Box mt={5}>
				<Grid
					gridTemplateColumns='repeat(auto-fill, minmax(300px, 1fr))'
					alignItems='center'
					gridGap={3}
				>
					{['patient', 'doctor'].includes(user.type) &&
						user.rendezvous.map(rendezvous => (
							<GridItem key={rendezvous.id}>
								<Card
									type='Rendezvous'
									{...{
										Firstname:
											user.type === 'doctor'
												? rendezvous.patient.firstname
												: rendezvous.doctor.firstname,
										Lastname:
											user.type === 'doctor'
												? rendezvous.patient.lastname
												: rendezvous.doctor.lastname,
										...(user.type === 'patient' && { Speciality: rendezvous.doctor.speciality }),
										...(user.type === 'doctor' && { Gender: rendezvous.patient.gender }),
										Date: rendezvous.date,
										Symptoms: rendezvous.Symptoms
									}}
								/>
							</GridItem>
						))}
				</Grid>
			</Box>
		</Box>
	) : (
		<Box h='100vh'>
			<Center>
				<Spinner />
			</Center>
		</Box>
	);
};

export default Home;
