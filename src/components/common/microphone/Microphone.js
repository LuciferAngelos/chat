import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ReactMic } from "react-mic";
import WaveSurfer from "wavesurfer";

import { makeStyles } from "@material-ui/core/styles";
import MicIcon from "@material-ui/icons/Mic";
import IconButton from "@material-ui/core/IconButton";
import StopIcon from "@material-ui/icons/Stop";
import ReplayIcon from "@material-ui/icons/Replay";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
		width: "50%",
		height: 30
	},
	wavesurfer: {
		width: "50%",
		margin: "0 auto"
	},
	flex: {
		flex: 1
	}
}));

export default function Microphone({ pushFile, setCurrentAvatarId }) {

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
			<Grid container justify="center">
				<Grid item>

					{!record && stopRecord ?
						(
							<IconButton onClick={startRecording}>
								<MicIcon className={classes.icon} />
							</IconButton>
						)
						:
						<IconButton onClick={totallyStop}>
							<MicIcon className={classes.icon} />
						</IconButton>}


				</Grid>
			</Grid>
			<Card >
				<DialogTitle className={classes.flex}>Open Micro</DialogTitle>
				<DialogContent>

					<div />
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
				</DialogContent>
				<DialogActions>
					<Grid container>
						<Grid item container justify="center" xs={12}>
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
