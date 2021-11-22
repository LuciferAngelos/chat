import React, { useContext, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import { Grid } from '@material-ui/core';
import './Chat.css'
import { VoiceChatButtonsContext, WSSSContext } from '../../../utils/Context';
import { initializePeerConnection } from '../peer/Peer';
import { getVideoAudioStream } from '../../../utils/audioVideoContent/AudioVideoInitiator';
import { createVideo } from '../../../utils/audioVideoContent/VideoCreator';
import { getScreen } from '../../../utils/audioVideoContent/ScreenShareInitiator';

import { startSocketIO } from '../../socket/socketForAVChat';
import { mainServerRoot, pathForWebSocket } from '../../socket/constants';
import { io } from 'socket.io-client';
import ChatBar from './chat-bar/ChatBar';

export const Chat = () => {

	const [isAudio, setIsAudio] = useState(false);
	const [isVideo, setIsVideo] = useState(false);
	const [isScreen, setIsScreen] = useState(false);
	const [messages, setMessages] = useState([]);
	const { userUUID, sessionToken } = useContext(WSSSContext);
	const [socketId, setSocketId] = useState('');
	const videoData = {};
	const [connections, setConnections] = useState({})

	const [peer, setPeer] = useState(null);
	// const [remotePeerId, setRemotePeerId] = useState('');
	const [outcomeStream, setOutcomeStream] = useState([]);
	const [innerStream, setInnnerStream] = useState(null);
	const [myVideoAdded, setMyVideoAdded] = useState(false);
	const [currentPeer, setCurrentPeer] = useState([]);
	const [peerIDsList, setPeerIDsList] = useState([]);
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const socket = useRef(null);

	const [userFromSocket, setUserFromSocket] = useState(null);

	//refs
	const videoContainer = useRef();

	//initialize navigator 
	useEffect(() => {
		getVideoAudioStream().then((stream) => {
			if (stream) {
				setInnnerStream(stream);
			}
		})
	}, [])

	//initialize peer only when we have a stream
	useEffect(() => {
		if (userUUID && sessionToken && innerStream) {
			setPeer(initializePeerConnection(userUUID, sessionToken));
			setSocketId(`${sessionToken}_9693986f-a0ad-4f50-9b98-4f740faa942c`)
		}
	}, [userUUID, sessionToken, innerStream])

	useEffect(() => {
		if (peer) {
			peer.on('open', function (id) {
				console.log(id);
				socket.current = io(`https://${mainServerRoot}/`, {
					path: pathForWebSocket,
				});

				startSocketIO(socket, peer, connectAndCall, disconnectFromPeer);
				peer.on('call', (call) => {

					const peerID = call.peer;
					if (peerID in connections) {
						return
					}

					setConnections(connections[peerID] = {
						call: call,
						video: undefined,
						innerStream: undefined,
					})

					call.answer(innerStream);

					call.on('stream', (remoteStream) => {
						if (connections[peerID].innerStream !== undefined) return;
						setRemoteStream(remoteStream, call)
					});

					call.on('close', () => {
						console.log('closed');
					})
				})
				socket.current.on('connected_result', (arg) => {
					console.log(arg);
					setUserFromSocket(arg);
				})

				socket.current.on('user_connected', (args) => {
					console.log('User connected => ', args)
					if (args !== peer.id) {
						connectAndCall(args, innerStream)
					}
				})

				socket.current.on('user_list', (args) => {
					console.log('users in list => ', args);
					setTimeout(function () {

						for (let remotePeerID of args) {
							if (remotePeerID !== peer.id) {
								connectAndCall(remotePeerID, innerStream)
							}
						}
					}, 2000)
				})

				socket.current.emit('user_connected', socketId)

				setPeerIDsList([...peerIDsList, id]);
			});

			peer.on('connection', function (connection) {
				setButtonDisabled(false)
			});

			peer.on('close', () => {
				console.log('closed');
			})

			peer.on('error', err => {
				console.log(err);
			})
		}
		return () => {		//??? чат список пользаков шакалится после
			peer && peer.destroy(); //между вкладками
			socket.current && socket.current.close();
			setInnnerStream(null);
		}
	}, [peer, socket])

	const setRemoteStream = (remoteStream, call) => {
		const peerID = call.peer;
		if (!peerIDsList.includes(peerID)) {
			const video = createVideo(userUUID, videoData, { id: peerID, stream: remoteStream }, videoContainer.current, 0);
			setCurrentPeer(currentPeer => [...currentPeer, call.peerConnection]);
			setPeerIDsList([...peerIDsList, call.peer]);
			setConnections(connections[peerID].innerStream = remoteStream)
			setConnections(connections[peerID].video = video)
		}
	}

	const disconnectFromPeer = (peerId) => {
		if (peerId in connections == false) {
			return
		}
		try {
			connections[peerId].video.remove();
			connections[peerId].connection.close();
			connections[peerId].conn.close();
		} catch (e) {
			console.log(e);
		}
		connections[peerId] = undefined;
		delete connections[peerId];
	}

	const startCapture = () => {
		setIsScreen(true);
	}
	//replace videostream and start screensharing
	useEffect(() => {
		if (isScreen) {
			getScreen().then((stream) => {
				if (stream) {
					const videoTrack = stream.getVideoTracks()[0];
					videoTrack.onended = () => {
						stopCapture();
					};
					currentPeer.forEach(peer => peer.getSenders().find(s => s.track.kind === videoTrack.kind).replaceTrack(videoTrack));
				}
			}).catch(err => {
				console.log('Unable to get display media ' + err);
			})
		}
	}, [isScreen])

	const stopCapture = () => {
		const videoTrack = innerStream.getVideoTracks()[0];
		currentPeer.forEach(peer => peer.getSenders().find(s => s.track.kind === videoTrack.kind).replaceTrack(videoTrack))
		setIsScreen(false);
	}

	const connectAndCall = (remotePeerId, stream) => {
		if (remotePeerId in connections) {
			return
		}
		setButtonDisabled(false);
		let call = peer.call(remotePeerId, stream);
		setConnections(connections[remotePeerId] = {
			call: call,
			video: undefined,
			innerStream: undefined,
			conn: peer.connect(remotePeerId)
		})

		call.on('stream', (remoteStream) => {
			if (connections[remotePeerId].innerStream !== undefined) return;
			setRemoteStream(remoteStream, call)
		});

		call.on('close', () => {
			setButtonDisabled(true);
		})
	}

	//Control of outcoming sound and video tracks. Mute by default
	// useEffect(() => {
	// 	if (!outcomeStream) return;

	// 	outcomeStream.forEach(stream => stream.getAudioTracks().forEach(track => {
	// 		track.enabled = isAudio;
	// 	}))
	// 	outcomeStream.forEach(stream => stream.getVideoTracks().forEach(track => {
	// 		track.enabled = isVideo;
	// 	}))

	// }, [outcomeStream, isAudio, isVideo]);


	//Control of inner sound and video tracks. Mute by default

	useEffect(() => {
		if (!innerStream) return;
		innerStream.getVideoTracks()[0].enabled = isVideo;
	}, [innerStream, isVideo]);

	useEffect(() => {
		if (!innerStream) return;
		innerStream.getAudioTracks()[0].enabled = isAudio;
	}, [innerStream, isAudio]);

	//context for buttons
	const [voiceChatCtx, setVoiceChatCtx] = useState({
		isAudio: null,
		setIsAudio: null,
		isVideo: null,
		setIsVideo: null,
		isScreen: null,
		startCapture: null,
		stopCapture: null,
		socket: null,
		messages: null,
		setMessages: null,
		me: null
	})

	useEffect(() => {
		if (socket.current) {
			setVoiceChatCtx({
				isAudio: isAudio,
				setIsAudio: setIsAudio,
				isVideo: isVideo,
				setIsVideo: setIsVideo,
				isScreen: isScreen,
				startCapture: startCapture,
				stopCapture: stopCapture,
				socket: socket.current,
				messages: messages,
				setMessages: setMessages,
				me: `${userUUID}_${sessionToken.split('-')[0]}`
			})
		}
	}, [isAudio, isVideo, isScreen, messages, userUUID, sessionToken, socket.current])

	return (
		<VoiceChatButtonsContext.Provider value={voiceChatCtx}>
			<Grid >
				<Box sx={{ display: 'flex', flexDirection: 'row' }}>
					{socket.current && <ChatBar />}
					<Box ref={videoContainer} sx={{ width: 'calc(100% - 435px)', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
					</Box >
				</Box >
			</Grid >
		</VoiceChatButtonsContext.Provider >
	);
}