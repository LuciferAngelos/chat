import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { getVideoAudioStream } from '../../../utils/AudioVideoInitiator';

const drawerWidth = 240;
const roomsTechPracticeNames = ['Техпрактика 1', 'Техпрактика 2', 'Техпрактика 3', 'Техпрактика 4 (Don\'t)', 'Техпрактика 5', 'Техпрактика 6']

var displayMediaOptions = {
	video: {
		cursor: "always"
	},
	audio: false
};


export const ChatBar = ({ getUsersFromStore, isAudio, setIsAudio, isVideo, setIsVideo }) => {
	const dispatch = useDispatch();
	const { userUUID } = useContext(WSSSContext)

	const [open, setOpen] = useState(true);
	const [openSt, setOpenSt] = useState(false);
	const [peer, setPeer] = useState(null);
	const [conn, setConn] = useState(null);
	const [outcomeStream, setOutcomeStream] = useState(null);
	const [incomeStream, setIncomeStream] = useState(null);
	const myVideo = useRef();
	const incomingVideo = useRef();

	function connectPeers() {
		setConn(peer.connect(remotePeerId))
	}

	function call(remotePeerId) {
		connectPeers();
		getVideoAudioStream(isVideo).then((stream) => {
			// let audio = new Audio();
			// audio.srcObject = stream;
			// audio.autoplay = true;
			setIncomeStream(stream);

			let call = peer.call(remotePeerId, stream);
			call.on('stream', (remoteStream) => {

				let audio = new Audio();
				audio.srcObject = remoteStream;
				audio.autoplay = true;

			});
		})
	}

	//test
	let [remotePeerId, setRemotePeerId] = useState('');
	//test

	useEffect(() => {
		if (userUUID) {
			setPeer(initializePeerConnection(userUUID));
		}
	}, [userUUID])

	useEffect(() => {

		if (peer) {

			peer.on('open', function (id) {
				console.log('My peer ID is: ' + id);
			});

			peer.on('connection', function (connection) {
				setConn(connection);
				console.log('connected with ', connection);
			});

			peer.on('call', (call) => {
				getVideoAudioStream(isVideo, isAudio).then((stream) => {
					// let audio = new Audio();
					// audio.srcObject = stream;
					// audio.autoplay = true;
					setOutcomeStream(stream);
					call.answer(stream);
					call.on('stream', (remoteStream) => {
						let audio = new Audio();

						audio.srcObject = remoteStream;
						audio.autoplay = true;
					});
				})
			})

		}

	}, [peer])

	useEffect(() => {
		if (!outcomeStream) return;
		if (!isAudio || isAudio) {
			outcomeStream.getAudioTracks()[0].enabled = !outcomeStream.getAudioTracks()[0].enabled;
		}
	}, [outcomeStream, isAudio]);

	useEffect(() => {
		if (!incomeStream) return;
		if (!isAudio || isAudio) {
			incomeStream.getAudioTracks()[0].enabled = !incomeStream.getAudioTracks()[0].enabled;
		}
	}, [incomeStream, isAudio]);

	const startCapture = () => {

	}

	const stopCapture = () => {

	}




	const handleClick = () => {
		setOpen(!open);
	}
	const handleClickSt = () => {

		setOpenSt(!openSt);
	}

	return (
		<Grid >
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Drawer
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
					<Microphone size={'1.5em'} isAudio={isAudio}
						setIsAudio={setIsAudio} />
				</Drawer>
				<Box sx={{ width: 'calc(100% - 240px)', display: 'flex', flexDirection: 'column' }}>
					<Box sx={{ width: '100%', m: '1em auto', bgcolor: 'background.paper', display: 'flex', flexDirection: 'row' }}>
						<Box component="main" sx={{ flexGrow: 1, p: 1 }}>
							<Microphone size={'2em'} isAudio={isAudio}
								setIsAudio={setIsAudio} />
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
							sx={{ marginTop: '2em', width: '100%', height: 200, maxWidth: 360, bgcolor: 'background.paper' }}
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
										}
										)
										:
										<Preloader />
								}
							</List>
						</Box>
					</Box>

					<Box sx={{ width: '100%', margin: '0 auto', bgcolor: 'background.paper', display: 'flex', flexDirection: 'row' }}>
						<Box sx={{ marginLeft: '.5em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
							<Typography paragraph>Мой ID {userUUID}</Typography>
							<Button sx={{ marginBottom: '1em' }} variant="outlined" onClick={startCapture}>Начать трансляцию</Button>
							<Button variant="outlined" onClick={stopCapture}>Закончить трансляцию</Button>
							<Button variant="outlined" onClick={() => call(remotePeerId)}>Позвонить</Button>
							<p>введи ИД здесь</p>
							<input type="text" onChange={e => setRemotePeerId(e.target.value)} />
						</Box>
						<video ref={myVideo} autoPlay height="200" width='200'></video>
						<video ref={incomingVideo} autoPlay height="400" width='100%'></video>
					</Box>
				</Box>

			</Box>
		</Grid>
	);
}