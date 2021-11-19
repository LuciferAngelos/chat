export function startSocketIO(socket, peer, connectAndCall, disconnectFromPeer, sessionToken, companyUUID = '9693986f-a0ad-4f50-9b98-4f740faa942c') {
	socket.io.on('open', () => {
		console.log('Socket Opened')
	})
	socket.io.on('close', () => {
		console.log('close')
		setTimeout(() => {
			startSocketIO(socket, peer, connectAndCall, disconnectFromPeer, sessionToken, companyUUID = '9693986f-a0ad-4f50-9b98-4f740faa942c')
		}, 1000)
	})
	socket.on("connect", () => {
		console.log('socket connected => ', socket.connected);
	});
	socket.on('connected_to_room', (arg) => {
		console.log(arg);
	})
	socket.on('user_disconnected', (args) => {
		console.log('user_disconnected')
		if (args !== peer.id) {
			disconnectFromPeer(args)
		}
	})

}