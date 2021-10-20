import React, { useCallback, useState } from 'react'
import { Input } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { getWayConnection } from '../../socket/getWayConnect';
import { NavLink } from 'react-router-dom';
import { mainRoot } from '../../socket/constants';

export const Main = ({ lobbyUUID, setLobbyUUID }) => {

	const handleConnectToGetWay = useCallback(() => {
		getWayConnection(lobbyUUID, 1);
	}, [lobbyUUID, setLobbyUUID])

	const handleGetLobbyUUID = useCallback((e) => {
		setLobbyUUID(e.target.value)
	}, [lobbyUUID, setLobbyUUID])

	return (
		<Box sx={{ m: 2 }}>
			<Box sx={{ m: 2 }}>
				<Box sx={{ m: 1 }}>Нажми на кнопку, чтобы войти в общую говорилку</Box>

				<NavLink exact to={mainRoot + '/lobby'} style={{ textDecoration: 'none', color: 'inherit' }}>
					<Button variant="outlined" /* onClick={handleConnectToGetWay} */>Войти в общее лобби</Button>
				</NavLink>

			</Box>
			<Box sx={{ marginTop: 20 }}>
				<Box sx={{ m: 2 }}>Введи ID, чтобы создать комнату или законнектиться в неё</Box>

				<Stack spacing={2} direction="row" justifyContent='center'>
					<Input onChange={handleGetLobbyUUID} />
					<NavLink exact to={mainRoot + `/lobby/${lobbyUUID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
						<Button variant="outlined" onClick={handleConnectToGetWay}>Войти в стенд</Button>
					</NavLink>
				</Stack>

			</Box>
		</Box>
	)
}