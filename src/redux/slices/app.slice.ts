import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../types/app.types';

const initialState: AppState = {
	theme: 'light',
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setThemeLight: (state, action) => {
			state.theme = 'light';
		},
		setThemeDark: (state, action) => {
			state.theme = 'dark';
		},
	},
});

export const { setThemeLight, setThemeDark } = appSlice.actions;

export default appSlice.reducer;

export function toggleThemeAction(){
	return (dispatch: any, getState: any) => {
		const { theme } = getState().app;
		if(theme === 'light'){
			dispatch(setThemeDark(null));
		} else {
			dispatch(setThemeLight(null));
		}
	}
}