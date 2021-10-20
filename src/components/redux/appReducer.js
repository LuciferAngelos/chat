import { getAuthUserData } from "./usersReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const TOKEN_USER_UUID_GOTTEN = 'TOKEN_USER_UUID_GOTTEN';
const ON_LINK_GOTTEN = 'ON_LINK_GOTTEN';
const ON_DIALOG = 'ON_DIALOG'
const GET_OUTPUT_PLAYER_VOICE_FROM_CLIENT = 'GET_OUTPUT_PLAYER_VOICE_FROM_CLIENT';
const GET_OUTPUT_PLAYER_VOICE_FROM_SERVER = 'GET_OUTPUT_PLAYER_VOICE_FROM_SERVER';


let initialState = {
	initialized: false,
	linkIsFetched: false,
	linkForSS: '',
	type: 1,
	onDialog: false,
	outputPlayerVoiceFromClient: null,
	outputPlayerVoiceFromSS: null
}

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true
			};
		case ON_DIALOG:
			return {
				...state,
				onDialog: !state.onDialog
			}
		case GET_OUTPUT_PLAYER_VOICE_FROM_CLIENT:
			return {
				...state,
				outputPlayerVoiceFromClient: action.voice
			}
		case GET_OUTPUT_PLAYER_VOICE_FROM_SERVER:
			return {
				...state,
				outputPlayerVoiceFromSS: action.voice
			}
		case ON_LINK_GOTTEN:
			return {
				...state,
				linkIsFetched: true,
				linkForSS: action.link,

			}
		default:
			return state
	}
}

//AC
export const setInitializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
export const setLinkForSS = (link) => ({ type: ON_LINK_GOTTEN, link })
// export const toggleOnDialog = () => ({ type: ON_DIALOG })
// export const setOutputPlayerVoiceFromClient = (voice) => ({ type: GET_OUTPUT_PLAYER_VOICE_FROM_CLIENT, voice })
// export const setOutputPlayerVoiceFromSS = (voice) => ({ type: GET_OUTPUT_PLAYER_VOICE_FROM_SERVER, voice })

//thunk
export const initializeApp = () => async (dispatch) => {
	let promise = dispatch(getAuthUserData());

	Promise.all([promise]).then(() => {
		dispatch(setInitializedSuccess());
	})

}