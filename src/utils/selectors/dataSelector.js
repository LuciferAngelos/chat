import { createSelector } from 'reselect'

const getApp = (state) => {
	return state.app
}

export const getOnDialog = createSelector(getApp, state => {
	return state.onDialog
})
export const getOnAudio = createSelector(getApp, state => {
	return state.outputPlayerVoiceFromClient
})