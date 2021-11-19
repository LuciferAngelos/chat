import React from 'react'
import Box from '@mui/material/Box';
import { VoiceTabPanel } from './tab-panel-element/VoiceTabPanel';
import { TextTabPanel } from './tab-panel-element/TextTabPanel';
import { UsersTabPanel } from './tab-panel-element/UsersTabPanel';

const boxStyles = {
	display: 'flex',
	position: 'relative',
	boxSizing: 'border-box',
	width: '435px',
	height: '90vh',
	margin: 0,
	padding: 0,

}

export const TabPanelContainer = ({ panelType }) => {
	if (panelType === 'voice') {
		return (
			<Box sx={boxStyles} >
				<VoiceTabPanel />
			</Box>
		)
	}
	if (panelType === 'text') {
		return (
			<Box sx={boxStyles} >
				<TextTabPanel />
			</Box>
		)
	}
	if (panelType === 'users') {
		return (
			<Box sx={boxStyles} >
				<UsersTabPanel />
			</Box>
		)
	}
}