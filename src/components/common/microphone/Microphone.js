import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ReactMic } from "react-mic";

import { makeStyles } from "@material-ui/core/styles";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from '@mui/icons-material/MicOff';
import IconButton from "@material-ui/core/IconButton";
import StopIcon from "@mui/icons-material/Stop";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import { red } from "@material-ui/core/colors";

import "./microphone.css";
import { Card } from "@material-ui/core";
// import { setOutputPlayerVoiceFromClient, toggleOnDialog } from "../../redux/appReducer";
import Recorder from 'recorder-js';


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

export default function Microphone({ size, isAudio, setIsAudio }) {

	const [stopRecord, setStopRecord] = useState(true)




	const startRecording = () => {
		setIsAudio(true)
		setStopRecord(false)
	};

	const totallyStop = () => {
		setIsAudio(false);
		setStopRecord(true);

	}

	const classes = useStyles();

	return (
		<>
			<Grid container justifyContent="center">
				<Grid item>

					{!isAudio && stopRecord ?
						(
							<IconButton onClick={startRecording}>
								<MicIcon className={classes.icon} style={{ width: size, height: size }} />
							</IconButton>
						)
						:
						<IconButton onClick={totallyStop}>
							<MicOffIcon className={classes.icon} style={{ width: size, height: size }} />
						</IconButton>}


				</Grid>
			</Grid>
		</>
	);
}
