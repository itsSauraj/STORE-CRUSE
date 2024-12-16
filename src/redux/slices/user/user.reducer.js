import USER_ACTIONS_TYPES from './user.types'


const USER_INITIAL_STATE = {
	currentUser: null,
}


export const userReducer = (state = USER_INITIAL_STATE, action) => {
	switch (action.type) {
	case USER_ACTIONS_TYPES.SET_USER:
		return {
			...state,
			currentUser: action.payload
		}
	default:
		return state
	}
}