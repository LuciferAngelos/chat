import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from '@mui/icons-material/MicOff';
import IconButton from "@material-ui/core/IconButton";
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Grid from "@material-ui/core/Grid";

import "./microphone.css";
// import { setOutputPlayerVoiceFromClient, toggleOnDialog } from "../../redux/appReducer";


const useStyles = makeStyles(theme => ({
	icon: {
		height: 38,
		width: 38
	},
	reactmic: {
		width: "80%",
		height: 30
	},
	flex: {
		flex: 1
	}
}));

export default function Microphone({ size, isAudio, setIsAudio, isVideo, setIsVideo }) {


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
			<Grid container justifyContent="center">
				<Grid item>

					{!isVideo ?
						(
							<IconButton onClick={startVideo}>
								<VideocamIcon className={classes.icon} style={{ width: size, height: size }} />
							</IconButton>
						)
						:
						<IconButton onClick={stopVideo}>
							<VideocamOffIcon className={classes.icon} style={{ width: size, height: size }} />
						</IconButton>}
					{!isAudio ?
						(
							<IconButton onClick={startAudio}>
								<MicIcon className={classes.icon} style={{ width: size, height: size }} />
							</IconButton>
						)
						:
						<IconButton onClick={stopAudio}>
							<MicOffIcon className={classes.icon} style={{ width: size, height: size }} />
						</IconButton>}


				</Grid>
			</Grid>
		</>
	);
}
