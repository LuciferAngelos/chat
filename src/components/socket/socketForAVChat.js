export function startSocketIO(socket, peer, connectAndCall, disconnectFromPeer) {
	socket.current.io.on('open', () => {
		console.log('Socket Opened')
	})
	socket.current.io.on('close', () => {
		console.log('close')
		setTimeout(() => {
			startSocketIO(socket.current, peer, connectAndCall, disconnectFromPeer)
		}, 1000)
	})
	socket.current.on("connect", () => {
		console.log('socket connected => ', socket.current.connected);
	});
	socket.current.on('connected_to_room', (arg) => {
		// console.log(arg);
	})
	socket.current.on('user_disconnected', (args) => {
		console.log('user_disconnected')
		if (args !== peer.id) {
			disconnectFromPeer(args)
		}
	})

}