// import { BufferStream } from "buffer-stream-js";
// import { getOnAudio, getOnDialog } from "../../utils/selectors/dataSelector";
// import { OutputPlayerAudio } from "../micRecorder/mainRecorderSettings";
// import { setOutputPlayerVoiceFromSS } from "../redux/appReducer";
// import store from "../redux/store";



// export const connectToSoundServer = (linkForSS, sessionToken, userUUID) => {

// 	let webSocketSS = linkForSS ? new WebSocket(linkForSS) : console.log('Fetching the link...');



// 	connect();

// 	function connect() {

// 		console.log(onDialog, audioFromPlayer);



// 		webSocketSS.onopen = () => {
// 			console.log('Sound Server WebSocket is connected and its state is ' + webSocketSS.readyState);

// 			const array = new Uint8Array(4 + 36 + 1 + 36);

// 			const methodBuffer = new Uint8Array(
// 				new Uint32Array([ToGetway_FromUnknown_AuthSocket]).buffer
// 			);
// 			const sessionBuffer = new TextEncoder().encode(
// 				sessionToken
// 			);
// 			const authType = new Uint8Array(
// 				new Uint32Array(1).buffer
// 			);
// 			const targetUUID = new TextEncoder().encode(
// 				userUUID
// 			);

// 			array.set(methodBuffer, 0);
// 			array.set(sessionBuffer, 4);
// 			array.set(authType, 40);
// 			array.set(targetUUID, 41);

// 			if (!isWSOpen(webSocketSS)) return
// 			webSocketSS.send(array);
// 		};

// 		webSocketSS.binaryType = "arraybuffer";
// 		webSocketSS.onmessage = buffer => {

// 			const message = new BufferStream(buffer.data);
// 			console.log(message, ' this is message');
// 			message.offset = 0;
// 			const method = message.readInt32LE();
// 			switch (method) {
// 				case FromMovement_FromPlayerScene_PlayerList:
// 					message.offset = 4;
// 					const countPlayers = message.readUInt32LE();

// 					const users = [];
// 					for (let index = 0; index < countPlayers; index++) {
// 						const user = readPlayerFromPlayerList(
// 							message,
// 							4 /* Method */ +
// 							4 /* Count */ +
// 							index *
// 							(36 /* UUID */ +
// 								4 /* ID */ +
// 								(4 + 4 + 4) /* Position */ +
// 								1) /* Flags */
// 						);
// 						users.push(user);
// 					}

// 					console.log(JSON.stringify(users));

// 					console.log(
// 						"Method: FromMovement_FromPlayerScene_PlayerList, count: " +
// 						countPlayers,
// 						users
// 					);
// 					break;
// 				case FromMovement_FromPlayerScene_PlayerJoin:
// 					const user = readPlayerFromPlayerList(message, 4);
// 					console.log("User Join: " + user.uuid);
// 					break;
// 				case FromMovement_FromPlayerScene_PlayerLeave:
// 					message.offset = 4;
// 					const uuid = message.readUtf8String(36);
// 					console.log("User Leave: " + uuid);
// 					break;
// 				case FromSound_FromPlayerScene_PlayerVoice:
// 					const user_from_voice = readPlayerFromPlayerList(message, 4, true);
// 					// Parse Voice Body
// 					const voiceBody = new Uint8Array(message.buffer.buffer, 21);
// 					// Play Voice Body
// 					// OutputPlayerAudio(voiceBody);
// 					setOutputPlayerVoiceFromSS(voiceBody)
// 					console.log(
// 						"FromSound_FromPlayerScene_PlayerVoice => ",
// 						user_from_voice
// 					);
// 					break;
// 				default:
// 					console.log("Method: Unknown");
// 					break;
// 			}

// 			console.log("WebSocket message received:", method);

// 		};

// 		webSocketSS.onclose = () => {
// 			if (!isWSOpen(webSocketSS)) {
// 				console.log('Sound Server Socket closed. trying to reconnect...');
// 				setTimeout(() => {
// 					webSocketSS = linkForSS ? new WebSocket(linkForSS) : console.log('Fetching the link...');
// 					connect()
// 					console.log(webSocketSS.readyState);
// 				}, 1000);
// 			}

// 		}
// 	}

// 	const readPlayerFromPlayerList = (
// 		buffer,
// 		startOffset,
// 		hasPosition = false
// 	) => {
// 		const userUUIDLen = hasPosition === true ? 0 : 36;

// 		let uuid = "";
// 		if (hasPosition === false) {
// 			buffer.offset = startOffset;
// 			uuid = buffer.readUtf8String(userUUIDLen);
// 		}
// 		buffer.offset = startOffset + userUUIDLen + 0;
// 		const id = buffer.readUInt32LE();

// 		const position = {
// 			x: 0,
// 			y: 0,
// 			z: 0,
// 		};

// 		buffer.offset = startOffset + userUUIDLen + 4 + 0;
// 		position.x = buffer.readFloatLE();

// 		buffer.offset = startOffset + userUUIDLen + 4 + 4;
// 		position.y = buffer.readFloatLE();

// 		buffer.offset = startOffset + userUUIDLen + 4 + 8;
// 		position.z = buffer.readFloatLE();

// 		buffer.offset = startOffset + userUUIDLen + 4 + 12;
// 		const state = buffer.readUInt8();

// 		return {
// 			uuid: uuid,
// 			id: id,
// 			position: position,
// 			state: state,
// 		};
// 	};
// }



// function isWSOpen(ws) {
// 	return ws.readyState === ws.OPEN
// }



// let sendPlayerTick = (
// 	position,
// 	state,
// 	voiceBody
// ) => {

// 	console.log('the voice body is ', position,
// 		state,
// 		voiceBody);

// 	const array = new Uint8Array(4 + 12 + 1 + voiceBody.byteLength);

// 	const methodBuffer = new Uint8Array(
// 		new Uint32Array([ToMovement_ToPlayerScene_PlayerTick]).buffer
// 	);

// 	array.set(methodBuffer, 0); // before 0, after 4

// 	array.set(new Uint8Array(new Float32Array([position.x]).buffer), 4); // before 4, after 8
// 	array.set(new Uint8Array(new Float32Array([position.y]).buffer), 4 + 4); // before 8, after 12
// 	array.set(new Uint8Array(new Float32Array([position.z]).buffer), 4 + 8); // before 12, after 16

// 	array.set(new Uint8Array([state]), 4 + 12); // before 16, after 17

// 	array.set(voiceBody, 4 + 12 + 1); // before 17, after 4

// 	console.log('the bufer on server side ', array);

// 	return array
// };

// sendPlayerTick = chunk =>
// 	sendPlayerTick({ x: 0, y: 0, z: 0 }, 0, chunk)

// let onDataFromSendPlayerTick = (sendPlayerTickResult, socket) => {
// 	console.log(sendPlayerTickResult());

// 	socket.send(sendPlayerTickResult());

// 	console.log('these are ondatafromsendplayers results ', sendPlayerTickResult);

// }



