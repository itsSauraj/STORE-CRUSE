import { createAction } from "@reduxjs/toolkit"
import USER_ACTIONS_TYPES from './user.types'

export const setCurrentUser = createAction(USER_ACTIONS_TYPES.SET_USER, (user) => {
	return {
		payload: user
	}
})
