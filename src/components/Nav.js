import {
	Flex,
	Spacer,
	Text,
	Button,
	ButtonGroup,
	Grid,
	GridItem,
	Box,
	useDisclosure,
	useColorMode,
	IconButton
} from '@chakra-ui/react';
import { PlusSquareIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions';
import Login from './Login';
import Signup from './Signup';

const Nav = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
	const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure();
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	return (
		<>
			<Login isOpen={isLoginOpen} onClose={onLoginClose} />
			<Signup isOpen={isSignupOpen} onClose={onSignupClose} />
			<Box py={2}>
				<Flex align='center'>
					<Grid
						gridTemplateColumns='repeat(2, auto)'
						columnGap={1}
						alignItems='center'
						justifyContent='center'
						cursor='pointer'
						onClick={() => history.push('/home')}
					>
						<GridItem>
							<PlusSquareIcon w={6} h={6} />
						</GridItem>
						<GridItem>
							<Text fontSize='md'>Healer</Text>
						</GridItem>
					</Grid>
					<Spacer />
					<ButtonGroup>
						<IconButton
							aria-label='Toggle Color Mode'
							icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
							variant='outline'
							onClick={toggleColorMode}
						/>
						{user ? (
							<>
								<Button
									variant='solid'
									onClick={() => window.location.replace(process.env.REACT_APP_LINK)}
								>
									Reserve
								</Button>
								<Button variant='outline' onClick={() => history.push('/settings')}>
									Settings
								</Button>
								<Button
									variant='outline'
									onClick={() => {
										dispatch(logout());
										history.push('/');
									}}
								>
									Logout
								</Button>
							</>
						) : (
							<>
								<Button variant='outline' onClick={onLoginOpen}>
									Login
								</Button>
								<Button variant='solid' onClick={onSignupOpen}>
									Signup
								</Button>
							</>
						)}
					</ButtonGroup>
				</Flex>
			</Box>
		</>
	);
};

export default Nav;
