import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Checkbox,
	Divider,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure
} from '@chakra-ui/react'

import { FilterChooseOption } from '@api/types/Filter/FilterChooseOption'

import { useFilter } from '@stores/filterStore'
import items from '@temp/filterData.json'

type ConfirmationModalProps = {
	localFilter: FilterChooseOption[]
	closeRootModal: () => void
}

const ConfirmationModal = ({
	localFilter,
	closeRootModal
}: ConfirmationModalProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const setFilter = useFilter(state => state.setFilter)
	const { t } = useTranslation('filter')

	return (
		<>
			<Button
				onClick={onOpen}
				colorScheme="orange"
				mr={3}
			>
				{t('apply')}
			</Button>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('confirm')}</ModalHeader>
					<ModalCloseButton />

					<ModalFooter>
						<Button
							variant="ghost"
							marginRight="2vw"
							onClick={() => {
								onClose()
							}}
						>
							{t('useOld')}
						</Button>

						<Button
							colorScheme="orange"
							mr={3}
							onClick={() => {
								setFilter(localFilter)
								onClose()
								closeRootModal()
							}}
						>
							{t('applyNew')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export const FilterModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const filterItems = items.filterItems
	const [localFilter, setLocalFilter] = useState([] as FilterChooseOption[])
	const { t } = useTranslation('filter')

	return (
		<>
			<Button onClick={onOpen}>{t('openModal')}</Button>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader>{t('filterHeader')}</ModalHeader>

					<ModalBody>
						{filterItems.map(section => (
							<section key={section.id}>
								<Text fontSize="xl">{section.name}</Text>

								<Box
									display="flex"
									flexWrap="wrap"
								>
									{section.options.map(item => (
										<Box
											key={item.id}
											w="33%"
											paddingBottom="8px"
										>
											<Checkbox
												name={item.id}
												isChecked={localFilter.some(itm => itm.id === item.id)}
												onChange={e => {
													if (e.target.checked) {
														setLocalFilter([...localFilter, item])
													} else {
														setLocalFilter(
															localFilter.filter(itm => itm.id !== item.id)
														)
													}
												}}
											>
												{item.name}
											</Checkbox>
										</Box>
									))}
								</Box>

								<Divider marginY="1vh" />
							</section>
						))}
					</ModalBody>

					<ModalFooter>
						<ConfirmationModal
							localFilter={localFilter}
							closeRootModal={onClose}
						/>
						<Button
							variant="ghost"
							onClick={() => {
								setLocalFilter([])
							}}
						>
							{t('reset')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
