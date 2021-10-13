import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Microphone from '../microphone/Microphone';
import { Grid } from '@material-ui/core';
import NavBar from '../navbar/NavBar';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import { routes } from './../../../utils/routes'
import './chatBar.css'
import { Switch, Route, NavLink } from 'react-router-dom'
import { ChatRoom1 } from './rooms/СhatRoom1';
import { СhatRoom2 } from './rooms/СhatRoom2';
import { СhatRoom3 } from './rooms/СhatRoom3';
import { СhatRoom4 } from './rooms/СhatRoom4';

const drawerWidth = 240;

export const ChatBar = () => {
	return (
		<Grid >
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
					<NavBar />
				</AppBar>
				<Drawer
					variant="permanent"
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
					}}
				>
					<Toolbar />
					<Box sx={{ overflow: 'auto' }}>
						<List>
							{['Room 1', 'Room 2', 'Room 3', 'Room 4 (Don\'t)'].map((text, index = 0) => (
								<NavLink
									to={routes[index]}
									style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
									activeClassName='activeLink'
									key={index}
									exact>
									{console.log(routes[index])
									}									<ListItem button >
										<ListItemIcon>
											<VoiceChatIcon />
										</ListItemIcon>
										<ListItemText primary={text} />
									</ListItem>
								</NavLink>
							))}
						</List>
						<Divider />
					</Box>
					<Microphone />
				</Drawer>
				<Box component="main" sx={{ flexGrow: 1, p: 10 }}>
					<Microphone />
					<Switch>
						<Route exact path='/'> <Typography paragraph>Выберите комнату для чата слева</Typography></Route>
						<Route exact path='/room1' component={ChatRoom1} />
						<Route exact path='/room2' component={СhatRoom2} />
						<Route exact path='/room3' component={СhatRoom3} />
						<Route exact path='/room4' component={СhatRoom4} />
						<Route path='*' render={() => <div>There is no such chat room!</div>} />
					</Switch>
				</Box>
			</Box>
		</Grid>
	);
}