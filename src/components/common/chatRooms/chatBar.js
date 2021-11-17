import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import Microphone from '../microphone/Microphone';
import { Grid, Typography } from '@material-ui/core';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import { routesTechPractices, routesStands } from './../../../utils/routes'
import './chatBar.css'
import { Switch, Route, NavLink } from 'react-router-dom'
import { ChatRoom1 } from './rooms/СhatRoom1';
import { СhatRoom2 } from './rooms/СhatRoom2';
import { СhatRoom3 } from './rooms/СhatRoom3';
import { СhatRoom4 } from './rooms/СhatRoom4';
import { useSelector } from 'react-redux';
import { Preloader } from '../preloader/Preloader';
import { WSSSContext } from '../../../utils/Context';
import { useDispatch } from 'react-redux';
import { setOutputPlayerScreenFromSS } from '../../redux/appReducer';
import { initializePeerConnection } from '../peer/Peer';
import { getVideoAudioStream } from '../../../utils/audioVideoContent/AudioVideoInitiator';
import { createVideo } from '../../../utils/audioVideoContent/VideoCreator';
import { getScreen } from '../../../utils/audioVideoContent/ScreenShareInitiator';


//удалить? для чата
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { timeFormatHelper } from '../../../utils/TimeFormatter'
import { Tooltip } from '@mui/material';
import { startSocketIO } from '../../socket/socketForAVChat';
import { mainServerRoot, pathForWebSocket } from '../../socket/constants';
import { io } from 'socket.io-client';

const drawerWidth = 360;
const roomsTechPracticeNames = ['Техпрактика 1', 'Техпрактика 2', 'Техпрактика 3', 'Техпрактика 4 (Don\'t)', 'Техпрактика 5', 'Техпрактика 6']


export const ChatBar = ({ getUsersFromStore, isAudio, setIsAudio, isVideo, setIsVideo, /* socket */ }) => {
	const dispatch = useDispatch();
	const { userUUID, sessionTokenForSS } = useContext(WSSSContext)
	const videoData = {};
	const [connections, setConnections] = useState({})

	const [peer, setPeer] = useState(null);
	// const [remotePeerId, setRemotePeerId] = useState('');
	const [outcomeStream, setOutcomeStream] = useState([]);
	const [innerStream, setInnnerStream] = useState(null);
	const [myVideoAdded, setMyVideoAdded] = useState(false);
	const [callType, setCallType] = useState('media');
	const [currentPeer, setCurrentPeer] = useState([]);
	const [peerIDsList, setPeerIDsList] = useState([]);
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const socket = io.connect(`https://${mainServerRoot}/`, {
		path: pathForWebSocket,
	})

	//refs
	const videoContainer = useRef();


	//for chat
	const [connection, setConnection] = useState(null);
	const [messages, setMessages] = useState([])
	const messageBox = useRef()

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

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (connection) {
			//зарефакторить?
			setMessages(messages => ([...messages, {
				me: true,
				currentMinutes: timeFormatHelper(new Date().getMinutes()),
				currentHour: timeFormatHelper(new Date().getHours()),
				message: messageBox.current.value
			}]));

			if (messageBox.current.value) {
				connection.send(messageBox.current.value);
				messageBox.current.value = '';
			} else {
				return
			}
		}
	}

	//0 for my video, 1 for incoming video
	const startCapture = () => {
		setCallType('screen');
	}

	useEffect(() => {
		if (callType === 'screen') {
			getScreen().then((stream) => {
				if (stream) {
					const videoTrack = stream.getVideoTracks()[0];
					videoTrack.onended = () => {
						stopCapture();
					};

					currentPeer.forEach(peer => peer.getSenders().find(s => s.track.kind === videoTrack.kind).replaceTrack(videoTrack))
					// sender.replaceTrack(videoTrack);

				}
			}).catch(err => {
				console.log('Unable to get display media ' + err);
			})

		}
	}, [callType])

	const stopCapture = () => {
		const videoTrack = innerStream.getVideoTracks()[0];

		currentPeer.forEach(peer => peer.getSenders().find(s => s.track.kind === videoTrack.kind).replaceTrack(videoTrack))

		setCallType('media');
	}

	const connectAndCall = (remotePeerId, stream) => {

		if (remotePeerId in connections) {
			return
		}
		// setConnection(peer.connect(remotePeerId));
		setButtonDisabled(false);
		// peer.connect(remotePeerId)
		// getVideoAudioStream().then((stream) => {
		// if (stream) {

		// setOutcomeStream([...outcomeStream, stream]);
		// setInnnerStream(stream);

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
			// const video = document.createElement('video');
			// video.srcObject = remoteStream;
			// video.classList.add('internalVideo');
			// video.id = remotePeerId;
			// video.autoplay = true;
			// videoContainer.current.append(video)

		});

		call.on('close', () => {
			setButtonDisabled(true);
		})

		socket.on('user_connected', (args) => {

			console.log('User connected => ', args)
			if (args !== peer.id) {
				connectAndCall(args, stream)
			}
		})
	}

	useEffect(() => {
		console.log(currentPeer);

		console.log(connections);

	}, [currentPeer, connections])

	useEffect(() => {
		if (userUUID) {
			setPeer(initializePeerConnection(userUUID));
		}
	}, [userUUID])

	useEffect(() => {
		if (peer) {
			getVideoAudioStream().then((stream) => {
				if (stream) {
					// setOutcomeStream([...outcomeStream, stream]);
					setInnnerStream(stream);

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

						call.answer(stream);

						call.on('stream', (remoteStream) => {

							if (connections[peerID].innerStream !== undefined) return;
							setRemoteStream(remoteStream, call)

							// const video = document.createElement('video');
							// video.srcObject = remoteStream;
							// video.classList.add('internalVideo');
							// video.id = peerID;
							// video.autoplay = true;
							// videoContainer.current.append(video)

						});

						call.on('close', () => {
							console.log('closed');
						})
					})
					socket.on('user_connected', (args) => {
						console.log('User connected => ', args)
						if (args !== peer.id) {
							connectAndCall(args, stream)
						}
					})
					socket.on('user_list', (args) => {
						console.log('users in list => ', args);
						setTimeout(function () {

							for (let remotePeerID of args) {
								if (remotePeerID !== peer.id) {
									connectAndCall(remotePeerID, stream)
								}
							}
						}, 2000)
					})
				}
			})
		}
	}, [peer])

	useEffect(() => {

		if (peer) {
			peer.on('open', function (id) {
				console.log(peer.open);
				startSocketIO(socket, peer, connectAndCall, disconnectFromPeer);

				socket.emit('user_connected', peer.id)

				console.log('My peer ID is: ' + id);
				setPeerIDsList([...peerIDsList, id]);
			});

			peer.on('connection', function (connection) {
				console.log(peer.connections);
				//для одного
				// setConnection(connection);
				setButtonDisabled(false)
			});


			peer.on('close', () => {
				console.log('closed');
			})

			peer.on('error', err => {
				console.log(err);
			})

		}

	}, [peer])

	useEffect(() => {
		if (connection) {
			connection.on('data', (mess) => {
				setMessages(messages => ([...messages, {
					me: false,
					currentMinutes: timeFormatHelper(new Date().getMinutes()),
					currentHour: timeFormatHelper(new Date().getHours()),
					message: mess
				}]))
			})
		}
	}, [connection])

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


	return (
		<Grid >
			<Box sx={{ display: 'flex' }}>

				{/* <AppBar position="fixed" sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1, width: drawerWidth, left: 0
				}}>
					<Toolbar sx={{ justifyContent: 'center' }}>
						<Typography variant="h6" noWrap component="div" >
							Чат
						</Typography>
					</Toolbar>
				</AppBar>

				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box',
						},
					}}
					variant="permanent"
					anchor="left"
				>
					<Divider />
					<List
						id='chat-list'
						sx={{ marginTop: '4em', overflowY: 'scroll', maxHeight: '75%' }} >
						{messages.map((dataObj, index) => (
							<ListItem key={index}>
								{dataObj.me ?
									(<ListItemText><span style={{ color: '#5271e3', fontWeight: 'bold' }}>Я</span> в {dataObj.currentHour}:{dataObj.currentMinutes} :
										<Typography > {dataObj.message}</Typography>
									</ListItemText>)
									:
									(<ListItemText><span style={{ color: '#ba32b3', fontWeight: 'bold' }}>На том конце провода</span> в {dataObj.currentHour}:{dataObj.currentMinutes} :
										<Typography > {dataObj.message}</Typography>
									</ListItemText>)
								}

							</ListItem>
						))}
					</List>
					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
						sx={{
							position: 'fixed',
							bottom: '.5%',
							width: drawerWidth,
						}}
					>
						<TextField
							id="outlined-multiline-flexible"
							label="Ваше сообщение"
							multiline
							rows={3}
							inputProps={{
								style: { paddingRight: '10%' },
								ref: messageBox
							}}
							sx={{
								width: '100%'
							}}
						/>
						<Button
							type='submit'
							onClick={handleSendMessage}
							sx={{
								position: 'absolute',
								bottom: '25%',
								right: 0
							}}
						>
							<SendIcon />
						</Button>
					</Box>
				</Drawer> */}
				{/* <Drawer
					variant="permanent"
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						[`& .MuiDrawer-paper`]: { marginTop: '5em', width: drawerWidth, boxSizing: 'border-box' },
					}}
				>
					<Box sx={{ overflow: 'auto' }}>
						<List>
							<ListItemButton onClick={handleClick}>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="Техпрактики" />
								{open ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>
							<Collapse in={open} timeout="auto" unmountOnExit>
								{roomsTechPracticeNames.map((text, index = 0) => (
									<NavLink
										to={routesTechPractices[index]}
										style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
										activeClassName='activeLink'
										key={index}
										exact>
										<ListItem button sx={{ pl: 4 }}>
											<ListItemIcon>
												<VoiceChatIcon />
											</ListItemIcon>
											<ListItemText primary={text} />
										</ListItem>
									</NavLink>
								))}
							</Collapse>

							<Divider />
							<ListItemButton onClick={handleClickSt}>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="Стенды" />
								{openSt ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>
							<Collapse in={openSt} timeout="auto" unmountOnExit>
								{routesStands.map((text, index = 0) => (
									<NavLink
										to={routesStands[index]}
										style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
										activeClassName='activeLink'
										key={index}
										exact>
										<ListItem button sx={{ pl: 4 }}>
											<ListItemIcon>
												<VoiceChatIcon />
											</ListItemIcon>
											<ListItemText primary={text} />
										</ListItem>
									</NavLink>
								))}
							</Collapse>
						</List>
						<Divider />
					</Box>
					<Microphone
						size={'1.5em'}
						isAudio={isAudio}
						setIsAudio={setIsAudio}
						isVideo={isVideo}
						setIsVideo={setIsVideo}
					/>
				</Drawer> */}
				<Box sx={{ width: 'calc(100% - 240px)', display: 'flex', flexDirection: 'column' }}>
					<Box sx={{ width: '100%', m: '1em auto', bgcolor: 'background.paper', display: 'flex', flexDirection: 'row' }}>
						<Box component="main" sx={{ flexGrow: 1, p: 1 }}>
							<Microphone
								size={'2em'}
								isAudio={isAudio}
								setIsAudio={setIsAudio}
								isVideo={isVideo}
								setIsVideo={setIsVideo}
							/>
							<Switch>
								{/* <Route exact path='/'> <Typography paragraph>Выберите комнату для чата слева</Typography></Route>
						<Route exact path='/room1' component={ChatRoom1} />
						<Route exact path='/room2' component={СhatRoom2} />
						<Route exact path='/room3' component={СhatRoom3} />
						<Route exact path='/room4' component={СhatRoom4} />
						<Route path='*' render={() => <div>There is no such chat room!</div>} /> */}
							</Switch>
						</Box>
						<Box
							sx={{ marginTop: '2em', width: '100%', maxWidth: 360, bgcolor: 'background.paper' }
							}
						>
							<List>
								<ListItemText primary={'Список пользователей'} />
								{
									getUsersFromStore.length !== 0 ?
										getUsersFromStore.map((user, index) => {
											return user.uuid === userUUID ?
												<ListItem key={index} component="div" disablePadding>
													<ListItemButton>
														<ListItemText primary={`Я: ${user.uuid}`} sx={{ color: 'red' }} />
													</ListItemButton>
												</ListItem>
												:
												<ListItem key={index} component="div" disablePadding>
													<ListItemButton>
														<ListItemText primary={user.uuid} />
													</ListItemButton>
												</ListItem>
										})
										:
										<Preloader />
								}
							</List>
						</Box >
					</Box >

					<Box sx={{ width: '100%', margin: '0 auto', bgcolor: 'background.paper', display: 'flex', flexDirection: 'row' }
					}>
						<Box sx={{ marginLeft: '.5em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
							{/* <Typography paragraph>Мой ID </Typography>
							<Typography paragraph></Typography> */}

							<Tooltip title={'Чтобы управлять трансляцией экрана, позвоните кому-нибудь'} placement='right-start'>
								<span style={{ display: 'block' }}>
									<Button
										sx={{ marginBottom: '1em', width: '100%' }}
										disabled={buttonDisabled}
										variant="outlined"
										onClick={startCapture}>Начать трансляцию
									</Button>
								</span>
							</Tooltip>
							<Tooltip title={'Чтобы управлять трансляцией экрана, позвоните кому-нибудь'} placement='right-start'>
								<span style={{ display: 'block' }}>
									<Button
										sx={{ marginBottom: '1em', width: '100%' }}
										disabled={buttonDisabled}
										variant="outlined"
										onClick={stopCapture}>Закончить трансляцию
									</Button>
								</span>
							</Tooltip>

							{/* <Tooltip title={'Вставьте ID адресата в поле ниже и нажмите "Позвонить"'} placement='bottom-start'>
								<Button variant="outlined" onClick={() => call(remotePeerId)}>Позвонить</Button>
							</Tooltip>
							<p>Введите ИД здесь</p>
							<input type="text" onChange={e => setRemotePeerId(e.target.value)} /> */}
						</Box>
						<Box ref={videoContainer} sx={{ marginLeft: '.5em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>

						</Box>

					</Box >
				</Box >

			</Box >
		</Grid >
	);
}