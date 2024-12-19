import { createSlice } from '@reduxjs/toolkit';
import { StoreUserProfileInterface } from '../../types/user.interface';

const initialState: StoreUserProfileInterface = {
	currentUser: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload;
		},
		logoutUser: (state, action) => {
			state.currentUser = null;
		},
	},
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;