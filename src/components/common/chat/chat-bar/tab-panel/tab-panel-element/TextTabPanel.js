import React, { useContext, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { Typography } from '@material-ui/core';
import ChatControlButtons from '../../../chat-control-btns/ChatControlButtons'
import { makeStyles } from '@material-ui/styles';
import IconButton from '@mui/material/IconButton';

import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { VoiceChatButtonsContext } from '../../../../../../utils/Context';
import { timeFormatHelper } from '../../../../../../utils/TimeFormatter';

const drawerWidth = 435;

const useStyles = makeStyles({
	toolbarRoot: {
		display: 'flex',
		width: '99.8%',
		backgroundColor: '#fff',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		padding: '0 !important',
		borderTop: ' 1px solid rgba(0, 0, 0, 0.12)',
		boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.1)',
		minHeight: '75px !important',
	},
	standTitle: {
		width: '100%',
		marginLeft: '1em',
		fontWeight: 700,
		fontSize: 18,
		textAlign: 'left'
	},
	standName: {
		width: '100%',
		marginLeft: '1em',
		fontWeight: 400,
		fontSize: 14,
		textAlign: 'left'
	},
	speaker: {
		backgroundColor: '#fff',
		color: '#262626',
		border: 'none',
		'&:hover': {
			backgroundColor: '#F1F9FA !important',
			border: 'none',
			boxShadow: 'none',
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#F1F9FA',
			border: 'none',
		},
		'&:focus': {
			boxShadow: 'none',
			backgroundColor: '#F1F9FA',
			border: 'none',
		},
	},
	myMessage: {
		backgroundColor: '#B1E6EA',
		color: '#272B2E',
		fontSize: '14px',
		padding: '15px',
		display: 'block',
		width: 'fit-content',
		marginLeft: 'auto',
		borderRadius: '8px 8px 0px 8px'
	},
	incomeMessage: {
		backgroundColor: '#E9EAF0',
		color: '#272B2E',
		fontSize: '14px',
		padding: '15px',
		display: 'block',
		width: 'fit-content',
		marginRight: 'auto',
		borderRadius: '0px 8px 8px 8px'
	}
});

const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: '#00AFBC',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: '#00AFBC',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: '#b0edf5',
		},
		'&:hover fieldset': {
			borderColor: '#00AFBC',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#00AFBC',
		},
	},
});

export const TextTabPanel = () => {
	const classes = useStyles();
	const messageBox = useRef();
	const { socket, messages, setMessages, me } = useContext(VoiceChatButtonsContext);

	const handleSendMessage = (e) => {
		e.preventDefault();

		if (messageBox.current.value) {
			socket.current.emit('chatMessage', messageBox.current.value);
			messageBox.current.value = '';
		} else {
			return
		}
	}
	useEffect(() => {
		console.log(messages);
	}, [messages])
	useEffect(() => {
		socket.current.on('chatMessage', (mess) => {
			console.log(mess);
			setMessages(messages => ([...messages, {
				me: mess.from.peerUUID === me ? true : false,
				currentMinutes: timeFormatHelper(new Date().getMinutes()),
				currentHour: timeFormatHelper(new Date().getHours()),
				message: mess.message,

			}]))
		})
	}, [])

	return (
		<>
			<Drawer
				sx={{
					// position: 'relative',
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						height: '81vh',
						left: 435,
						boxSizing: 'border-box',
					},
					'& .MuiDrawer-paper::-webkit-scrollbar': {
						width: '0px',
						background: 'transparent',
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar classes={{ root: classes.toolbarRoot }} sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					}
				}} >
					<Typography noWrap component="div" className={classes.standTitle}>
						Зона практик
					</Typography>
					<Typography noWrap component="div" className={classes.standName}>
						Стенд
					</Typography>
				</Toolbar>
				<Divider />
				<List
					id='chat-list'
					sx={{ overflowY: 'scroll', }} >
					{messages.map((dataObj, index) => {
						return dataObj.me ?
							(<ListItem key={index}>
								<ListItemText>
									<Typography className={classes.myMessage}> {dataObj.message}</Typography>
									<Typography align='right' style={{ color: '#C5C7D1', fontSize: '14px' }}> {dataObj.currentHour}:{dataObj.currentMinutes}</Typography>
								</ListItemText>
							</ListItem>)
							:
							(<ListItem key={index}>
								<ListItemText>
									<Typography className={classes.incomeMessage}> {dataObj.message}</Typography>
									<Typography align='left' style={{ color: '#C5C7D1', fontSize: '14px' }}> {dataObj.currentHour}:{dataObj.currentMinutes}</Typography>
								</ListItemText>
							</ListItem>)
					}

					)}
				</List>
			</Drawer>
			<Box
				component="form"
				onSubmit={handleSendMessage}
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
				<CssTextField
					label="Введите сообщение..."
					id="custom-css-outlined-input"
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
						bottom: '15%',
						right: 0
					}}
				>
					<SendIcon />
				</Button>
			</Box>
		</>
	)
}