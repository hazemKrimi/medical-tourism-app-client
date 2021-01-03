import {
	Heading,
	Text,
	Button,
	Grid,
	GridItem,
	Box,
	Center,
	useDisclosure
} from '@chakra-ui/react';
import Signup from '../components/Signup';

const Landing = () => {
	const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure();

	return (
		<>
			<Signup isOpen={isSignupOpen} onClose={onSignupClose} />
			<Box mt={10} py={5} h='90vh'>
				<Grid gridTemplateColumns='1fr' rowGap={3} alignItems='center'>
					<GridItem>
						<Heading textAlign='center'>Get Medical Assistance Abroad The Easy Way</Heading>
						<Text textAlign='center'>
							We provide all you need from accomodation to highly skilled doctors to make you better
						</Text>
					</GridItem>
					<GridItem>
						<Center>
							<Button variant='solid' colorScheme='blue' onClick={onSignupOpen}>
								Get Started
							</Button>
						</Center>
					</GridItem>
				</Grid>
			</Box>
		</>
	);
};

export default Landing;
