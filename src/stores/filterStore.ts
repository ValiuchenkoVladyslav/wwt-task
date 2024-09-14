import { create } from 'zustand'

import { FilterChooseOption } from '@api/types/Filter/FilterChooseOption'

// unknown breaks the type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFilter = create((_set: any) => {
	const set: (typeof useFilter)['setState'] = _set

	return {
		filter: [] as FilterChooseOption[],

		setFilter: (filter: FilterChooseOption[]) => {
			set({ filter })
		}
	}
})
