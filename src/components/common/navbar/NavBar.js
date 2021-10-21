import { BufferStream } from "buffer-stream-js";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import {
	ToGetway_FromUnknown_AuthSocket,
	ToMovement_ToPlayerScene_PlayerTick,
	FromMovement_FromPlayerScene_PlayerJoin,
	FromMovement_FromPlayerScene_PlayerLeave,
	FromMovement_FromPlayerScene_PlayerList,
	FromSound_FromPlayerScene_PlayerVoice
} from "../../socket/constants.js";
import { WSSSContext } from "../../../utils/Context";
import { setUserLeft, setUserJoined, setUsersFromList } from '../../redux/usersReducer.js';
import { WSTransferTest } from './WSTransferTest.js';
import { setOutputPlayerScreenFromSS } from "../../redux/appReducer.js";


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	},
}));
const style = {
	position: 'absolute',
	top: '6%',
	right: '10%',
	width: 400,
	maxHeight: '70vh',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	border: '1px solid grey',
	overflow: 'auto'
};

function isWSOpen(ws) {
	return ws.readyState === 1
}

const readPlayerFromPlayerList = (
	buffer,
	startOffset,
	hasPosition = false
) => {
	const userUUIDLen = hasPosition === true ? 0 : 36;

	let uuid = "";
	if (hasPosition === false) {
		buffer.offset = startOffset;
		uuid = buffer.readUtf8String(userUUIDLen);
	}
	buffer.offset = startOffset + userUUIDLen + 0;
	const id = buffer.readUInt32LE();

	const position = {
		x: 0,
		y: 0,
		z: 0,
	};

	buffer.offset = startOffset + userUUIDLen + 4 + 0;
	position.x = buffer.readFloatLE();

	buffer.offset = startOffset + userUUIDLen + 4 + 4;
	position.y = buffer.readFloatLE();

	buffer.offset = startOffset + userUUIDLen + 4 + 8;
	position.z = buffer.readFloatLE();

	buffer.offset = startOffset + userUUIDLen + 4 + 12;
	const state = buffer.readUInt8();

	return {
		uuid: uuid,
		id: id,
		position: position,
		state: state
	};
};

// function Video(src, append) {
// 	var v = document.createElement("video");
// 	if (src != "") {
// 		v.src = src;
// 	}
// 	if (append == true) {
// 		document.body.appendChild(v);
// 	}
// 	return v;
// }

// You can then use it like this:

// var video = new Video("YOUR_VIDEO_URL", true);
// // do whatever you want...
// video.height = 280;
// video.width = 500;
// video.controls = "controls";
// video.play();


let outputPlayerVoice = blobForPlay => {
	const outputBlob = new Blob([blobForPlay], {
		type: "audio/webm;codecs=opus",
	});

	const fileReader = new FileReader();
	fileReader.readAsDataURL(outputBlob);
	fileReader.onloadend = () => {
		const base64String = fileReader.result;
		const audio = new Audio(base64String);
		audio.addEventListener('canplaythrough', () => {
			audio.play();
		})
	};
}

export const NavBar = ({ getUsersFromStore, setScreenBlob }) => {
	const classes = useStyles();

	const [openModal, setOpenModal] = useState(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	const [connected, setConnected] = useState(false);

	const dispatch = useDispatch();

	const { linkForSS, sessionTokenForSS, userUUID, getConnectionType, lobbyUUID } = useContext(WSSSContext)

	let webSocketSS = null;

	//get self uuid

	const [users, setUsers] = useState([])

	//ref for ws
	const webSocket = useRef(null)

	useEffect(() => {
		if (linkForSS) start();

		function start() {

			const linkSS = linkForSS ? linkForSS : console.log('Fetching the link...');

			webSocketSS = new WebSocket(linkSS);
			webSocket.current = webSocketSS;
			window.webSocketSS = webSocketSS;
			webSocketSS.binaryType = "arraybuffer";



			// webSocketSS.onopen = () => {
			// 	console.log('Sound Server WebSocket is connected and its state is ' + webSocketSS.readyState);
			// 	console.log('Websocket open status is => ', opened);

			// 	const array = new Uint8Array(4 + 36 + 1 + 36);

			// 	const methodBuffer = new Uint8Array(
			// 		new Uint32Array([ToGetway_FromUnknown_AuthSocket]).buffer
			// 	);
			// 	const sessionBuffer = new TextEncoder().encode(
			// 		sessionTokenForSS
			// 	);
			// 	const authType = new Uint8Array(
			// 		new Uint32Array(1).buffer
			// 	);
			// 	const targetUUID = new TextEncoder().encode(
			// 		userUUIDForSS
			// 	);

			// 	array.set(methodBuffer, 0);
			// 	array.set(sessionBuffer, 4);
			// 	array.set(authType, 40);
			// 	array.set(targetUUID, 41);

			// 	if (!isWSOpen(webSocketSS)) return
			// 	webSocketSS.send(array);
			// };


			webSocketSS.onopen = () => {
				const array = new Uint8Array(4 + 36 + 1 + 36)

				const methodBuffer = new Uint8Array(new Uint32Array([ToGetway_FromUnknown_AuthSocket]).buffer)
				const sessionBuffer = new TextEncoder().encode(sessionTokenForSS)
				const locationUUIDBuffer = new TextEncoder().encode(lobbyUUID) // 36 LEN частное лобби или общее
				console.log(lobbyUUID);
				array.set(methodBuffer, 0)
				array.set(sessionBuffer, 4)
				array.set(new Uint8Array([getConnectionType]), 4 + 36)
				array.set(locationUUIDBuffer, 4 + 36 + 1)

				webSocketSS.send(array);

				if (webSocketSS.readyState === 1) {
					setConnected(true)
				}
			};


			webSocketSS.onmessage = buffer => {

				const message = new BufferStream(buffer.data);
				message.offset = 0;
				const method = message.readInt32LE();
				switch (method) {
					case FromMovement_FromPlayerScene_PlayerList:
						message.offset = 4;
						const countPlayers = message.readUInt32LE();

						const users = [];
						for (let index = 0; index < countPlayers; index++) {
							const user = readPlayerFromPlayerList(
								message,
								4 /* Method */ +
								4 /* Count */ +
								index *
								(36 /* UUID */ +
									4 /* ID */ +
									(4 + 4 + 4) /* Position */ +
									1) /* Flags */
							);

							if (user.uuid === userUUID) {
								console.log('the uuid is the same');
							}
							users.push(user);
						}

						dispatch(setUsersFromList(users))

						console.log(JSON.stringify(users));

						console.log(
							"Method: FromMovement_FromPlayerScene_PlayerList, count: " +
							countPlayers,
							users
						);

						break;
					case FromMovement_FromPlayerScene_PlayerJoin:

						console.log('the message => ', message);

						const user = readPlayerFromPlayerList(message, 4);
						console.log("User Join: " + user.uuid);
						dispatch(setUserJoined(user))
						break;
					case FromMovement_FromPlayerScene_PlayerLeave:
						message.offset = 4;
						const uuid = message.readUtf8String(36);
						console.log("User Leave: " + uuid);
						dispatch(setUserLeft(uuid))
						break;
					case FromSound_FromPlayerScene_PlayerVoice:
						const user_from_voice = readPlayerFromPlayerList(message, 4, true);
						// Parse Voice Body
						const voiceBody = new Uint8Array(message.buffer.buffer, 21);
						setScreenBlob(new Blob([voiceBody], {
							type: "video/x-matroska;codecs=avc1",
						}))
						// Play Voice Body
						outputPlayerVoice(voiceBody);
						console.log(
							"FromSound_FromPlayerScene_PlayerVoice => ",
							user_from_voice
						);
						break;
					default:
						console.log("Method: Unknown");
						break;
				}

				console.log("WebSocket message received:", method);

			};

			webSocketSS.onclose = (e) => {
				console.log('Sound Server Socket closed. Trying to reconnect...');
				console.log('Server closed with code => ', e.code);

				if (webSocketSS.readyState !== 1) {
					setConnected(false)
				}

				if (e.code !== 1005) {
					setTimeout(() => {
						start()
						console.log(webSocketSS.readyState);
					}, 1000);
				} else {
					console.log('Socket was closed by user');
				}


			}

			webSocketSS.onerror = (err) => {
				console.log('This error happened => ', err);
				webSocketSS.close()
			}

			let sendPlayerTick = (
				position,
				state,
				voiceBody
			) => {

				console.log('the voice body is ', position,
					state,
					voiceBody);

				const array = new Uint8Array(4 + 12 + 1 + voiceBody.byteLength);

				const methodBuffer = new Uint8Array(new Uint32Array([ToMovement_ToPlayerScene_PlayerTick]).buffer
				);

				array.set(methodBuffer, 0); // before 0, after 4

				array.set(new Uint8Array(new Float32Array([position.x]).buffer), 4); // before 4, after 8
				array.set(new Uint8Array(new Float32Array([position.y]).buffer), 4 + 4); // before 8, after 12
				array.set(new Uint8Array(new Float32Array([position.z]).buffer), 4 + 8); // before 12, after 16

				array.set(new Uint8Array([state]), 4 + 12); // before 16, after 17

				array.set(voiceBody, 4 + 12 + 1); // before 17, after 4

				if (!isWSOpen(webSocketSS)) return
				webSocketSS.send(array)
			};

			window.sendPlayerTick = audioChunk => sendPlayerTick({ x: 0, y: 0, z: 0 }, 0, audioChunk)
		}

		return () => {
			if (!webSocket.current && !linkForSS) {
				return
			} else {
				webSocket.current.close();
				webSocket.current = null;

			}
		}

	}, [linkForSS]);

	useMemo(() => {
		setUsers(getUsersFromStore)
		console.log(users);
	}, [getUsersFromStore, users])

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<WSTransferTest socket={webSocket.current} />
					<Typography variant="h6" className={classes.title}>
						Connection Status:
						{connected ? ' Connected!' : ' Disconnected!'}
					</Typography>
					<Button color="inherit" onClick={handleOpen}>Users List</Button>
					<Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						open={openModal}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={openModal}>
							<Box sx={style}>
								<Typography id="transition-modal-title" variant="h6" component="h2">
									Users connected:
								</Typography>
								{
									getUsersFromStore.length !== 0 ? getUsersFromStore.map(u => {
										return userUUID === u.uuid ?
											<Typography id="transition-modal-description" sx={{ mt: 2 }} key={u.id}>
												Self: <span style={{ color: 'red' }}>{u.uuid}</span>
											</Typography>

											:
											<Typography id="transition-modal-description" sx={{ mt: 2 }} key={u.id}>
												User's UUID: <span style={{ color: 'blue' }}>{u.uuid}</span>
											</Typography>
									}
									)
										:
										(<Typography id="transition-modal-description" sx={{ mt: 2 }}>
											Waiting for users
										</Typography>)
								}
							</Box>
						</Fade>
					</Modal>
				</Toolbar>
			</AppBar>
		</div>
	);
}
