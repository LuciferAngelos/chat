const USER_JOINED = 'USER_JOINED';
const USER_LEFT = 'USER_LEFT';

const initialState = {
	users: [
		{
			"uuid": "104c6945-c0b5-4e79-9b72-f8205b7d1b58",
			"id": 287784485,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "5fa62577-9394-4b73-8228-711dd23d5e98",
			"id": 287796511,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "4470a01d-1cd4-495a-ab49-1ca62e2e696a",
			"id": 287808486,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "e64e96dc-d1d8-4c64-b896-40e045fc0eb5",
			"id": 287844097,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "d1f7affa-1f4c-43aa-8b11-a289f9aa911f",
			"id": 287844523,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "d1f7affa-1f4c-43aa-8b11-a289f9aa911f",
			"id": 287844523,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "2bd15f59-e5ba-4630-8beb-940661044cdc",
			"id": 287850118,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "e2359313-0a64-4570-9069-f6fb837ada95",
			"id": 287850481,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "e64e96dc-d1d8-4c64-b896-40e045fc0eb5",
			"id": 287844097,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "d1f7affa-1f4c-43aa-8b11-a289f9aa911f",
			"id": 287844523,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "d1f7affa-1f4c-43aa-8b11-a289f9aa911f",
			"id": 287844523,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "2bd15f59-e5ba-4630-8beb-940661044cdc",
			"id": 287850118,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "e2359313-0a64-4570-9069-f6fb837ada95",
			"id": 287850481,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "e64e96dc-d1d8-4c64-b896-40e045fc0eb5",
			"id": 287844097,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "d1f7affa-1f4c-43aa-8b11-a289f9aa911f",
			"id": 287844523,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "d1f7affa-1f4c-43aa-8b11-a289f9aa911f",
			"id": 287844523,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "2bd15f59-e5ba-4630-8beb-940661044cdc",
			"id": 287850118,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "e2359313-0a64-4570-9069-f6fb837ada95",
			"id": 287850481,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "e64e96dc-d1d8-4c64-b896-40e045fc0eb5",
			"id": 287844097,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "d1f7affa-1f4c-43aa-8b11-a289f9aa911f",
			"id": 287844523,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "d1f7affa-1f4c-43aa-8b11-a289f9aa911f",
			"id": 287844523,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "2bd15f59-e5ba-4630-8beb-940661044cdc",
			"id": 287850118,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		},
		{
			"uuid": "e2359313-0a64-4570-9069-f6fb837ada95",
			"id": 287850481,
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"state": 0
		}

	]
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