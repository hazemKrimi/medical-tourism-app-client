import { Heading, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Home = () => {
	const user = useSelector(state => state.user);

	return (
		<Box my={5} py={5}>
			<Heading>
				Welcome{' '}
				{['patient', 'doctor'].includes(user.type)
					? `${user.firstname} ${user.lastname}`
					: user.name}
			</Heading>
		</Box>
	);
};

export default Home;
