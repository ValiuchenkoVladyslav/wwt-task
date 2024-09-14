import { Box } from '@chakra-ui/react'

import { useFilter } from '@stores/filterStore'

import { FilterModal } from './FilterModal'

export const App = () => {
	const filter = useFilter(state => state.filter)

	return (
		<Box
			maxW="90rem"
			mx="auto"
			minH="100dvh"
		>
			<FilterModal />

			{JSON.stringify(filter)}
		</Box>
	)
}
