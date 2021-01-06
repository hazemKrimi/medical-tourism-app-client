import { Grid, GridItem, Text, Box } from '@chakra-ui/react';

const Card = ({ type, ...rest }) => {
	return (
		<Box p={3} w='100%' borderWidth='1px' borderRadius='lg'>
			<Grid alignItems='center' templateColumns='1fr auto' columnGap={3}>
				<GridItem>
					<Text fontSize='xl' fontWeight='bold'>
						{type}
					</Text>
					{Object.entries(rest).map(([key, value], index) => (
						<Text fontSize='lg' key={index}>
							{key}: {value}
						</Text>
					))}
				</GridItem>
			</Grid>
		</Box>
	);
};

export default Card;
