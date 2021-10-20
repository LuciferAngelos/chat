class WebSocketClient {
	static instance = null;
	callbacks = {};

	static getInstance() {
		if (!WebSocketClient.instance) WebSocketClient.instance = new WebSocketClient();
		return WebSocketClient.instance;
	}

	constructor() {
		this.socketRef = null;
	}

	addCallbacks = (...callbacks) => this.callbacks = { ...callbacks };

	connect = () => {
		const path = 'YOUR_SOCKET_PATH';
		this.socketRef = new WebSocket(path);
		this.socketRef.onopen = () => {
			console.log('WebSocket open');
		};

		this.socketRef.onmessage = e => {
			this.socketNewMessage(e.data);
		};

		this.socketRef.onerror = e => {
			console.log(e.message);
		};

		this.socketRef.onclose = () => {
			console.log("WebSocket closed let's reopen");
			this.connect();
		};
	}

	state = () => this.socketRef.readyState;

	waitForSocketConnection = (callback) => {
		const socket = this.socketRef;
		const recursion = this.waitForSocketConnection;
		setTimeout(
			() => {
				if (socket.readyState === 1) {
					console.log("Connection is made")
					if (callback != null) {
						callback();
					}
					return;
				} else {
					console.log("wait for connection...")
					recursion(callback);
				}
			},
			1);
	}

}

export default WebSocketClient.getInstance();