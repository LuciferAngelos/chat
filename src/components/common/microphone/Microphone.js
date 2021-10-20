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
import { green, red, blue } from "@material-ui/core/colors";

import "./microphone.css";
import { Card } from "@material-ui/core";
import { sendPlayerTick } from "../../socket/serverConnection";
import { setOutputPlayerVoiceFromClient, toggleOnDialog } from "../../redux/appReducer";
import { useDispatch } from "react-redux";

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

export default function Microphone({ size }) {

	const dispatch = useDispatch();

	const [record, setRecord] = useState(false);
	const [open, setOpen] = useState(false);
	const [stopRecord, setStopRecord] = useState(true)
	// const [audioChunks, setAudioChunks] = useState([]);

	let audioChunks = [];

	const [playerReady, setPlayerReady] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const wavesurfer = useRef(null);


	useEffect(() => {
		if (stopRecord) return

		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			const mediaRecorder = new window.MediaRecorder(stream);
			let audioChunks = [];
			console.log(stream.getAudioTracks());
			mediaRecorder.start();
			window.str = stream

			mediaRecorder.addEventListener(
				"dataavailable",
				(event) => {
					audioChunks.push(event.data);

				}
			);

			mediaRecorder.addEventListener("stop", () => {

				if (audioChunks.length > 0) {

					const mimeType = audioChunks[0].type;
					const audioBlob = new Blob(audioChunks, { type: mimeType });

					audioBlob.arrayBuffer().then((arrayBuffer) => {
						const audioBuffer = new Uint8Array(arrayBuffer);

						window.sendPlayerTick(audioBuffer);
					});
				}
				audioChunks = [];

				if (window.str !== null) {
					mediaRecorder.start();
					setTimeout(() => {
						if (mediaRecorder.state !== 'inactive') {
							mediaRecorder.stop();
						} else {
							return
						}
					}, 1000);

				}
			});

			setTimeout(() => {
				if (mediaRecorder.state !== 'inactive') {
					mediaRecorder.stop();
				} else {
					return
				}
			}, 1000);

		});

	}, [record, stopRecord])

	const continueRecording = () => {
		setRecord(true);


	};


	const startRecording = () => {
		setRecord(true)
		setStopRecord(false)
	};

	const stopRecording = () => {
		setRecord(false);

		// console.log(btnIsClicked, record, ' on stop');
	};
	function stopStream() {
		if (!window.streamReference) return;

		window.streamReference.getAudioTracks().forEach(function (track) {
			track.stop();
		});

		window.streamReference.getVideoTracks().forEach(function (track) {
			track.stop();
		});

		window.streamReference = null;
	}
	const totallyStop = () => {
		setRecord(false);
		setStopRecord(true);
		window.str.getAudioTracks().forEach(function (track) {
			track.stop();
		});
		window.str = null;
	}

	const onData = recordedBlob => {

	};

	const onStop = () => {

	};



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
				<ReactMic
					record={record}
					className={classes.reactmic}
					visualSetting="frequencyBars"
					echoCancellation={true}
					noiseSuppression={true}
					onStop={onStop}
					onData={onData}
					strokeColor="green"
					backgroundColor="white"
				/>
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
