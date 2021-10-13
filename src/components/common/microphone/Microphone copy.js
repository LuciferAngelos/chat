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

	// useEffect(() => {
	// 	wavesurfer.current = WaveSurfer.create({
	// 		container: "#wavesurfer-id",
	// 		waveColor: "grey",
	// 		progressColor: "tomato",
	// 		height: 140,
	// 		cursorWidth: 1,
	// 		cursorColor: "lightgrey",
	// 		barWidth: 2,
	// 		normalize: true,
	// 		responsive: true,
	// 		fillParent: true
	// 	});

	// 	wavesurfer.current.on("ready", () => {
	// 		setPlayerReady(true);
	// 	});

	// 	const handleResize = wavesurfer.current.util.debounce(() => {
	// 		wavesurfer.current.empty();
	// 		wavesurfer.current.drawBuffer();
	// 	}, 150);

	// 	wavesurfer.current.on("play", () => setIsPlaying(true));
	// 	wavesurfer.current.on("pause", () => setIsPlaying(false));
	// 	window.addEventListener("resize", handleResize, false);
	// }, []);



	useMemo(() => {

		if (record && !stopRecord) {
			setTimeout(() => {
				stopRecording();
			}, 999);
			setTimeout(() => {
				continueRecording();
			}, 1000);
			console.log(record, stopRecord);
		}

	}, [record, stopRecord])




	// const togglePlayback = () => {
	// 	if (!isPlaying) {
	// 		wavesurfer.current.play();
	// 	} else {
	// 		wavesurfer.current.pause();
	// 	}
	// };
	const stopPlayback = () => wavesurfer.current.stop();


	const handleCancel = () => {
		setRecord(false);
		setOpen(false);
	};

	const continueRecording = () => {
		setRecord(true);


	};
	const startRecording = () => {
		setRecord(true);
		setStopRecord(false);
		// console.log(btnIsClicked, record, ' on start');

	};

	const stopRecording = () => {
		setRecord(false);
		// console.log(btnIsClicked, record, ' on stop');
	};

	const totallyStop = () => {
		setRecord(false);
		setStopRecord(true)
	}
	useMemo(() => {
		if (record && stopRecord) {
			totallyStop();
		}
	}, [record, stopRecord])
	const onData = recordedBlob => {
		audioChunks.push(recordedBlob)
	};

	const onStop = () => {

		console.log(audioChunks);
		if (audioChunks.length > 0) {
			const mimeType = audioChunks[0].type;
			const audioBlob = new Blob(audioChunks, { type: mimeType });

			audioBlob.arrayBuffer().then((buffer) => {
				dispatch(toggleOnDialog())
				const audioBuffer = new Uint8Array(buffer);
				console.log('this is audiobufer from useEffect ', audioBuffer);
				window.sendPlayerTick(audioBuffer)
				// dispatch(setOutputPlayerVoiceFromClient(audioBuffer));
				// setAudioChunks([])

				// dispatch(toggleOnDialog())
				// dispatch(setOutputPlayerVoiceFromClient(null));
			});
			audioChunks = [];
		}
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
