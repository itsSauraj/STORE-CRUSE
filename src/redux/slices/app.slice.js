import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
	return (dispatch, getState) => {
		const { theme } = getState().app;
		if(theme === 'light'){
			dispatch(setThemeDark());
		} else {
			dispatch(setThemeLight());
		}
	}
}