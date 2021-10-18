const GET_CURRENT_USERS_LIST = 'GET_CURRENT_USERS_LIST';
const USER_JOINED = 'USER_JOINED';
const USER_LEFT = 'USER_LEFT';

const initialState = {
	users: [],
	self: ''
}

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CURRENT_USERS_LIST:
			return {
				...state,
				users: action.users
			};
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

export const setUsersFromList = users => ({ type: GET_CURRENT_USERS_LIST, users })
export const setUserJoined = user => ({ type: USER_JOINED, user })
export const setUserLeft = userUuid => ({ type: USER_LEFT, userUuid })