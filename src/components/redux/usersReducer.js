import { authAPI } from "../../api/Api";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CURRENT_USERS_LIST = 'GET_CURRENT_USERS_LIST';
const USER_JOINED = 'USER_JOINED';
const USER_LEFT = 'USER_LEFT';

const initialState = {
	users: [],
	self: {
		session_uuid: "",
		user_id: null,
		user_uuid: "",
		email: "",
		avatar: "",
		first_name: "",
		secon_name: "",
		last_name: "",
		phone: "",
		birthday: "",
		sex: "",
		company_uuid: "",
		company_name: "",
		company_position: "",
		company_role: null,
		system_role: null
	},
	isAuth: false
}

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				self: { ...action.payload },
				isAuth: true
			};
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

export const setAuthUserData = payload => ({ type: SET_USER_DATA, payload })
export const setUsersFromList = users => ({ type: GET_CURRENT_USERS_LIST, users })
export const setUserJoined = user => ({ type: USER_JOINED, user })
export const setUserLeft = userUuid => ({ type: USER_LEFT, userUuid })

//thunk
export const getAuthUserData = () => async (dispatch) => {
	let response = await authAPI.me();

	if (response.data.code === 0) {
		let payload = response.data.response.user
		dispatch(setAuthUserData(payload))
	}
}