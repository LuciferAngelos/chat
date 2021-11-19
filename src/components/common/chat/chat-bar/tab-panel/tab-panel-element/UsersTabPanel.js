import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Popover from '@mui/material/Popover';
import { MenuItem } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

const drawerWidth = 435;

const arr = ['Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович', 'Иванов Иван Иванович',]
const BootstrapButton = styled(Button)({
	boxShadow: 'none',
	textTransform: 'none',
	fontSize: 14,
	padding: '12px 17px',
	border: 'none',
	color: '#fff',
	lineHeight: 1.5,
	borderRadius: '20px',
	backgroundColor: '#00AFBC',
	fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(','),
	'&:hover': {
		backgroundColor: '#F1F9FA',
		color: '#00AFBC',
		borderColor: '#09d4e3',
		boxShadow: 'none',
	},
	'&:active': {
		boxShadow: 'none',
		color: '#00AFBC',
		backgroundColor: '#F1F9FA',
		borderColor: '#09d4e3',
	},
	'&:focus': {
		boxShadow: '0 0 0 0.2rem rgba(9,212,227, 0.8)',
	},
});
const ColorButton = styled(Button)({
	boxShadow: 'none',
	textTransform: 'none',
	fontSize: 14,
	padding: '12px 17px',
	border: 'none',
	color: '#00AFBC',
	lineHeight: 1.5,
	borderRadius: '20px',
	backgroundColor: '#F1F9FA',
	fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(','),
	'&:hover': {
		backgroundColor: '#00AFBC',
		color: '#fff',
		borderColor: '#09d4e3',
		boxShadow: 'none',
	},
	'&:active': {
		boxShadow: 'none',
		color: '#fff',
		backgroundColor: '#00AFBC',
		borderColor: '#09d4e3',
	},
	'&:focus': {
		boxShadow: '0 0 0 0.2rem rgba(9,212,227, 0.8)',
	},
});

function CustomizedButtons() {
	return (
		<Stack spacing={2} direction="row" style={{ justifyContent: 'space-evenly', width: '100%' }}>
			<ColorButton variant="contained">Отправить визитку</ColorButton>
			<BootstrapButton variant="contained">
				Написать личное сообщение
			</BootstrapButton>
		</Stack>
	);
}

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
export const UsersTabPanel = () => {
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
						left: 870,
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

				<Divider />
				<List sx={{ marginTop: '0' }}>
					{arr.map((text, index) => (
						<ListItem
							className={classes.speaker}
							key={index}
							disablePadding
						>
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
				width: { drawerWidth },
				display: 'flex',
				position: 'absolute', bottom: 0,
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}>
				<CustomizedButtons />
			</Box>
		</>
	)
}