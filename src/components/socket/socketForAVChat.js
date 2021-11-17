export function startSocketIO(socket, peer, connectAndCall, disconnectFromPeer) {
	socket.io.on('open', () => {
		console.log('Socket Opened')
	})
	socket.io.on('close', () => {
		console.log('close')

		setTimeout(() => {
			startSocketIO(socket, peer, connectAndCall)
		}, 1000)
	})
	socket.on("connect", () => {
		console.log('socket connected => ', socket.connected);
	});

	socket.on('user_disconnected', (args) => {
		console.log('user_disconnected')
		if (args !== peer.id) {
			disconnectFromPeer(args)
		}
	})

}