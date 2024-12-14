import { createAction } from "@reduxjs/toolkit"
import USER_ACTIONS_TYPES from './user.types'

export const setCurrentUser = (user) => createAction( USER_ACTIONS_TYPES.SET_USER, user)
