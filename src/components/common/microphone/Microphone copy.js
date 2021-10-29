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

export default function Microphone({ size, record, setRecord }) {

	const [stopRecord, setStopRecord] = useState(true)

	function analyticVoice(stream) {
		const audioContext = new (window.AudioContext || window.webkitAudioContext)();
		const analyser = audioContext.createAnalyser();
		const microphone = audioContext.createMediaStreamSource(stream);
		const javascriptNode =
			audioContext.createScriptProcessor(1024, 1, 1);

		analyser.smoothingTimeConstant = 0;
		analyser.fftSize = 1024;

		microphone.connect(analyser);
		analyser.connect(javascriptNode);
		javascriptNode.connect(audioContext.destination);
		return javascriptNode
	}

	// audio: {
	// 	echoCancellation: true,
	// 	noiseSuppression: true,
	// }


	useEffect(() => {

		if (!stopRecord) {
			navigator.mediaDevices.getUserMedia({
				audio: {
					autoGainControl: true, channelCount: 1, echoCancellation: false, delay: 0, noiseSuppression: false, sampleRate: 48000, sampleSize: 16, volume: 1.0
				}, video: false
			}).then((stream) => {
				// analyticVoice(stream)
				const mediaRecorder = new window.MediaRecorder(stream);
				mediaRecorder.start(1000);

				window.str = stream;
				let audioChunks = []

				mediaRecorder.addEventListener("dataavailable", (event) => {
					if (event.data.size > 0) {
						audioChunks.push(event.data);
					}
				});


				mediaRecorder.addEventListener("stop", () => {

					if (audioChunks.length > 0) {

						const mimeType = audioChunks[0].type;
						const audioBlob = new Blob(audioChunks, { type: mimeType });

						audioBlob.arrayBuffer().then((arrayBuffer) => {
							const audioBuffer = new Uint8Array(arrayBuffer);

							window.sendPlayerTick(audioBuffer);
							audioChunks = [];
							if (window.str !== null) {
								mediaRecorder.start(1000);

								setTimeout(() => {
									if (mediaRecorder.state !== 'inactive') {
										mediaRecorder.stop();
									}
								}, 1000);
							}
						});
					}

				});

				setTimeout(() => {
					if (mediaRecorder.state !== 'inactive') {
						mediaRecorder.stop();
					}
				}, 1000);
			});

		}



	}, [stopRecord])

	const startRecording = () => {
		setRecord(true)
		setStopRecord(false)
	};

	const totallyStop = () => {
		setRecord(false);
		setStopRecord(true);
		window.str.getTracks().forEach(function (track) {
			track.stop();
		});
		window.str = null;
	}

	const classes = useStyles();

	return (
		<>
			<Grid container justifyContent="center">
				<Grid item>

					{!record && stopRecord ?
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
			<Card >
				{/* <ReactMic
					record={record}
					className={classes.reactmic}
					visualSetting="frequencyBars"
					echoCancellation={false}
					noiseSuppression={false}
					strokeColor="green"
					backgroundColor="white"
				/> */}
				<DialogActions>
					<Grid container>
						<Grid item container justifyContent="center" xs={12}>
							{!record && stopRecord && (
								<IconButton onClick={startRecording}>
									<FiberManualRecordIcon
										style={{ color: red[500] }}
										className={classes.icon}
									/>
								</IconButton>
							)}

							{record && !stopRecord && (
								<IconButton onClick={totallyStop}>
									<StopIcon className={classes.icon} />
								</IconButton>
							)}



						</Grid>
					</Grid>
				</DialogActions>
			</Card>
		</>
	);
}
