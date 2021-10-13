import Axios from 'axios'
import { BufferStream } from "buffer-stream-js";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";

import {

	ToGetway_FromUnknown_AuthSocket,
	ToMovement_ToPlayerScene_PlayerTick,
	FromMovement_FromPlayerScene_PlayerJoin,
	FromMovement_FromPlayerScene_PlayerLeave,
	FromMovement_FromPlayerScene_PlayerList,
	FromSound_FromPlayerScene_PlayerVoice
} from "../../socket/constatns.js";
import { WSSSContext } from "../../../utils/Context";
import { setOutputPlayerVoiceFromClient, setOutputPlayerVoiceFromSS } from "../../redux/appReducer";


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

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
		state: state,
	};
};


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

export default function NavBar() {
	const classes = useStyles();

	const [connected, setConnected] = useState(false);

	const dispatch = useDispatch();
	const { linkForSS, sessionTokenForSS, userUUIDForSS } = useContext(WSSSContext)




	//get soundPacket

	const onVoiceChat = useSelector(state => state.app.onDialog)
	const audioFromPlayer = useSelector(state => state.app.outputPlayerVoiceFromClient)


	useEffect(() => {


		start();

		function start() {
			let webSocketSS = linkForSS ? new WebSocket(linkForSS) : console.log('Fetching the link...');
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

				Axios.get('https://getway.dev.viexpo.ru/api/account/fake/get').then((res) => {
					const sessionUUID = res.data.response.session_uuid
					const array = new Uint8Array(4 + 36 + 1 + 36)

					const methodBuffer = new Uint8Array(new Uint32Array([ToGetway_FromUnknown_AuthSocket]).buffer)
					const sessionBuffer = new TextEncoder().encode(sessionUUID)
					const locationUUIDBuffer = new TextEncoder().encode("123456789012345678901234567890123456") // 36 LEN

					array.set(methodBuffer, 0)
					array.set(sessionBuffer, 4)
					array.set(new Uint8Array([0]), 4 + 36)
					array.set(locationUUIDBuffer, 4 + 36 + 1)

					webSocketSS.send(array);

					if (webSocketSS.readyState === 1) {
						setConnected(true)
					}
				})
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
							users.push(user);
						}

						console.log(JSON.stringify(users));

						console.log(
							"Method: FromMovement_FromPlayerScene_PlayerList, count: " +
							countPlayers,
							users
						);
						console.log('Sound Server WebSocket state is ' + webSocketSS.readyState);

						break;
					case FromMovement_FromPlayerScene_PlayerJoin:
						const user = readPlayerFromPlayerList(message, 4);
						console.log("User Join: " + user.uuid);
						break;
					case FromMovement_FromPlayerScene_PlayerLeave:
						message.offset = 4;
						const uuid = message.readUtf8String(36);
						console.log("User Leave: " + uuid);
						break;
					case FromSound_FromPlayerScene_PlayerVoice:
						const user_from_voice = readPlayerFromPlayerList(message, 4, true);
						// Parse Voice Body
						const voiceBody = new Uint8Array(message.buffer.buffer, 21);
						// Play Voice Body
						outputPlayerVoice(voiceBody);
						// dispatch(setOutputPlayerVoiceFromSS(voiceBody))
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


				setTimeout(() => {
					start()
					console.log(webSocketSS.readyState);
				}, 1000);

			}

			webSocketSS.onerror = (err) => {
				console.log('This error happened => ', err);
				webSocketSS.close()
			}



			// if (audioFromPlayer) {
			// 	sendPlayerTick({ x: 0, y: 0, z: 0 }, 0, audioFromPlayer)
			// 	dispatch(setOutputPlayerVoiceFromClient(null))
			// }

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


		};



	}, [linkForSS]);


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
					<Typography variant="h6" className={classes.title}>
						Connection Status:
						{connected ? ' Connected!' : ' Disconnected!'}
					</Typography>
					<Button color="inherit" /* onClick={handleConnect} */>AChat Connection</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
