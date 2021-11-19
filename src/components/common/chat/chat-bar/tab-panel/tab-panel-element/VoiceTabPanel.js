import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ChatControlButtons from '../../../chat-control-btns/ChatControlButtons'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { MenuItem } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';


const drawerWidth = 435;

const arr = ['Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович',]

const useStyles = makeStyles({
	toolbarRoot: {
		display: 'flex',
		width: '99.8%',
		backgroundColor: '#fff',
		position: 'fixed !important',
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
});

//роли спикеров
export const VoiceTabPanel = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;


	return (
		<>
			<Drawer
				sx={{
					position: 'relative',
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						height: '80vh',
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
				<List sx={{ marginTop: '75px' }}>
					{arr.map((text, index) => (
						<ListItem
							className={classes.speaker}
							key={index}
							disablePadding
							secondaryAction={
								<IconButton edge="end" onClick={() => console.log(2)} >
									<VolumeUpIcon />
								</IconButton>
							}>
							<ListItemButton className={classes.speaker} onClick={handleClick}>
								<ListItemText aria-describedby={id} primary={text} secondary={index % 2 === 0 ? 'Secondary text' : null} />
							</ListItemButton>
							<Popover
								id={id}
								open={open}
								anchorEl={anchorEl}
								onClose={handleClose}
								PaperProps={{
									style: {
										border: '1px solid #d5f2f5',
										boxShadow: 'none',
										borderRadius: '8px',
										backgroundColor: '#fff'
									}
								}}
								anchorPosition={{ top: 120, left: 700 }}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'center',
									horizontal: 'right',
								}}
							>
								<MenuItem>Задать вопрос в текстовом чате</MenuItem>
								<MenuItem>И сделать что-то ещё</MenuItem>
								<MenuItem>И ещё</MenuItem>

							</Popover>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Box sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}>
				<ChatControlButtons />
			</Box>
		</>
	)
}