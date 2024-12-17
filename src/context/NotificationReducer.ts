export type TypeNotification = {
    message?: string | null,
    status?: 'success' | 'error' | 'warning' | 'info' | null,
}

export type TypeNotificationState = {
    readonly notification? : TypeNotification | null,
    readonly duration?: number
}


// initital
export const initialState: TypeNotificationState = {
	notification : null,
	duration: 3000
}


// Action 
export enum NOTIFICATION_ACTIONS {
	SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
	SET_DURATION = 'SET_DURATION',
}


// Action Creator
export type ActionTypeWithPayload<T, P> = {
	type: T,
	payload: P
}

export type ActionTypeWithoutPayload<T> = {
	type: T
}

export function createAction<T extends String, P>(type: T, payload: P): ActionTypeWithPayload<T, P>;
export function createAction<T extends String>(type: T, payload: void): ActionTypeWithoutPayload<T>;
export function createAction<T extends String, P>(type: T, payload: P) {
	return { type, payload };
}


type TypeShowNotification = ActionTypeWithPayload<NOTIFICATION_ACTIONS.SHOW_NOTIFICATION, TypeNotification>
type TypeSetDuration = ActionTypeWithPayload<NOTIFICATION_ACTIONS.SET_DURATION, number>

export type TypeNotificationAction = TypeShowNotification | TypeSetDuration


export const showNotification = (notification : TypeNotification) => 
	createAction(NOTIFICATION_ACTIONS.SHOW_NOTIFICATION, notification)

export const setDuration = (duration : number) =>
	createAction(NOTIFICATION_ACTIONS.SET_DURATION, duration)


// Reducer
export const notificationReducer = (
	state = initialState, 
	action = {} as TypeNotificationAction
)  => {
	switch (action.type) {
	case NOTIFICATION_ACTIONS.SHOW_NOTIFICATION:
		return {
			...state,
			notification: action.payload
		}
	case NOTIFICATION_ACTIONS.SET_DURATION:
		return {
			...state,
			duration: action.payload
		}
	default:
		return state
	}
}

