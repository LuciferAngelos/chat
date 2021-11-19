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

import Microphone from './chat-control-btns/ChatControlButtons';
import { Grid, Typography } from '@material-ui/core';
import './chatBar.css'
import { Preloader } from '../preloader/Preloader';
import { WSSSContext } from '../../../utils/Context';


{/* <Box
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
</Box > */}