import React, { useState, useRef, useEffect, useMemo, useCallback, useContext } from "react";
import { Tooltip } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from '@mui/icons-material/MicOff';
import IconButton from "@material-ui/core/IconButton";
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';

import "./ChatControlButtons.css";
import { Box } from "@mui/system";
import { VoiceChatButtonsContext } from "../../../../utils/Context";
// import { setOutputPlayerVoiceFromClient, toggleOnDialog } from "../../redux/appReducer";


const useStyles = makeStyles(theme => ({
	icon: {
		height: '1em',
		width: '1em'
	},
	reactmic: {
		width: "80%",
		height: 30
	},
	flex: {
		flex: 1
	}
}));

export default function ChatControlButtons() {

	const { isAudio, setIsAudio, isVideo, setIsVideo, isScreen, startCapture, stopCapture } = useContext(VoiceChatButtonsContext);

	const startAudio = () => {
		setIsAudio(true)
	};

	const stopAudio = () => {
		setIsAudio(false);
	}
	const startVideo = () => {
		setIsVideo(true)
	};

	const stopVideo = () => {
		setIsVideo(false);
	}

	const classes = useStyles();

	return (
		<>
			<Box sx={{ marginLeft: '.5em', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', right: 0, bottom: '10px' }}>
				{!isScreen ?
					<Tooltip title={'Демонстрация экрана отключена'} placement='top-start'>
						<IconButton onClick={startCapture}>
							<DesktopAccessDisabledIcon style={{ width: '.8em', height: '.8em', color: '#FF94A1' }} />
						</IconButton>
					</Tooltip>
					:
					<Tooltip title={'Демонстрация экрана включена'} placement='top-start'>
						<IconButton onClick={stopCapture}>
							<DesktopWindowsIcon style={{ width: '.8em', height: '.8em', color: '#B5B5C3' }} />
						</IconButton>
					</Tooltip>
				}
				{!isVideo ?
					<Tooltip title={'Видео выключено'} placement='top-start'>
						<IconButton onClick={startVideo}>
							<VideocamOffIcon className={classes.icon} style={{ color: '#FF94A1' }} />
						</IconButton>
					</Tooltip>
					:
					<Tooltip title={'Видео включено'} placement='top-start'>
						<IconButton onClick={stopVideo}>
							<VideocamIcon className={classes.icon} style={{ color: '#B5B5C3' }} />
						</IconButton>
					</Tooltip>}
				{!isAudio ?
					<Tooltip title={'Звук включён'} placement='top-start'>
						<IconButton onClick={startAudio}>
							<MicOffIcon className={classes.icon} style={{ color: '#FF94A1' }} />
						</IconButton>
					</Tooltip>
					:
					<Tooltip title={'Звук выключен'} placement='top-start'>
						<IconButton onClick={stopAudio}>
							<MicIcon className={classes.icon} style={{ color: '#B5B5C3' }} />
						</IconButton>
					</Tooltip>}
			</Box>
		</>
	);
}
