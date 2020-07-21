import { ADD_LOCAL_FILES, LocalFilesActionTypes, LocalFilesState, REMOVE_LOCAL_FILES } from './types';

export const addLocalFiles = (items: LocalFilesState): LocalFilesActionTypes => {
	return {
		type: ADD_LOCAL_FILES,
		items,
	};
};

export const removeLocalFiles = (item: string | number): LocalFilesActionTypes => {
	return {
		type: REMOVE_LOCAL_FILES,
		item,
	};
};
