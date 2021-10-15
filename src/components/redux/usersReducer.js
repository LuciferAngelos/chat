const USER_JOINED = 'USER_JOINED';
const USER_LEFT = 'USER_LEFT';

const initialState = {
	users: []
}

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_JOINED:
			return {
				...state,
				users: [...state.users, action.user]
			};
		case USER_LEFT:
			return {
				...state,
				users: state.users.filter(u => u.uuid != action.userUuid)
			};
		default:
			return state
	}
}

//ac

export const setUserJoined = user => ({ type: USER_JOINED, user })
export const setUserLeft = userUuid => ({ type: USER_LEFT, userUuid })