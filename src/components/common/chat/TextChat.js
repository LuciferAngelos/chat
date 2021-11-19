import { AppBar, Drawer, Typography } from "@mui/material";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box';
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

import Microphone from '../microphone/Microphone';
import { Grid } from '@material-ui/core';
import './chatBar.css'
import { Preloader } from '../preloader/Preloader';

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
