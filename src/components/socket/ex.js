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



(function () {
	const socket = io.connect(window.location.origin);
	const localVideo = document.querySelector('.localVideo');
	const remoteVideos = document.querySelector('.remoteVideos');
	const peerConnections = {};
	var url_string = window.location.href
	var url = new URL(url_string);
	var de = url.searchParams.get("key");
	let room = de
	let getUserMediaAttempts = 5;
	let gettingUserMedia = false;
	let getdisplaymedia = true;
	/** @type {RTCConfiguration} */
	const config = {
		'iceServers': [{
			'urls': ['stun:stun.l.google.com:19302']
		}]
	};
	/** @type {MediaStreamConstraints} */
	const constraints = {
		audio: true,
		video: { facingMode: "user" }
	};
	socket.on('full', function (room) {
		alert('Room ' + room + ' is full');
	});
	socket.on('bye', function (id) {
		handleRemoteHangup(id);
	});

	if (room && !!room) {
		socket.emit('join', room);
	}

	window.onunload = window.onbeforeunload = function () {
		socket.close();
	};

	socket.on('ready', function (id) {
		if (!(localVideo instanceof HTMLVideoElement) || !localVideo.srcObject) {
			return;
		}
		const peerConnection = new RTCPeerConnection(config);
		peerConnections[id] = peerConnection;
		if (localVideo instanceof HTMLVideoElement) {
			peerConnection.addStream(localVideo.srcObject);
		}
		peerConnection.createOffer()
			.then(sdp => peerConnection.setLocalDescription(sdp))
			.then(function () {
				socket.emit('offer', id, peerConnection.localDescription);
			});
		peerConnection.onaddstream = event => handleRemoteStreamAdded(event.stream, id);
		peerConnection.onicecandidate = function (event) {
			if (event.candidate) {
				socket.emit('candidate', id, event.candidate);

			}
		};
	});

	socket.on('offer', function (id, description) {
		const peerConnection = new RTCPeerConnection(config);
		peerConnections[id] = peerConnection;
		if (localVideo instanceof HTMLVideoElement) {
			peerConnection.addStream(localVideo.srcObject);
		}
		peerConnection.setRemoteDescription(description)
			.then(() => peerConnection.createAnswer())
			.then(sdp => peerConnection.setLocalDescription(sdp))
			.then(function () {
				socket.emit('answer', id, peerConnection.localDescription);
			});
		peerConnection.onaddstream = event => handleRemoteStreamAdded(event.stream, id);
		peerConnection.onicecandidate = function (event) {
			if (event.candidate) {
				socket.emit('candidate', id, event.candidate);
			}
		};
	});

	socket.on('candidate', function (id, candidate) {
		peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate))
			.catch(e => console.error(e));
	});

	socket.on('answer', function (id, description) {
		peerConnections[id].setRemoteDescription(description);
	});

	function getUserMediaSuccess(stream) {
		gettingUserMedia = false;
		if (localVideo instanceof HTMLVideoElement) {
			!localVideo.srcObject && (localVideo.srcObject = stream);
		}
		socket.emit('ready');
	}

	function handleRemoteStreamAdded(stream, id) {
		const remoteVideo = document.createElement('video');
		remoteVideo.srcObject = stream;
		remoteVideo.setAttribute("id", id.replace(/[^a-zA-Z]+/g, "").toLowerCase());
		remoteVideo.setAttribute("playsinline", "true");
		remoteVideo.setAttribute("autoplay", "true");
		remoteVideos.appendChild(remoteVideo);
		if (remoteVideos.querySelectorAll("video").length === 1) {
			remoteVideos.setAttribute("class", "one remoteVideos");
		} else {
			remoteVideos.setAttribute("class", "remoteVideos");
		}
	}

	function getUserMediaError(error) {
		console.error(error);

		gettingUserMedia = false;
		(--getUserMediaAttempts > 0) && setTimeout(getUserMediaDevices, 1000);
	}

	function getUserMediaDevices() {
		var constraints = { audio: true, video: { width: 1280, height: 720 } };

		navigator.mediaDevices.getDisplayMedia(constraints)
			.then(function (mediaStream) {
				var video = document.querySelector('video');
				video.srcObject = mediaStream;
				video.onloadedmetadata = function (e) {
					video.play();
					getUserMediaSuccess(video.srcObject)
				};
			})
			.catch(function (err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
	}

	function handleRemoteHangup(id) {
		peerConnections[id] && peerConnections[id].close();
		delete peerConnections[id];
		document.querySelector("#" + id.replace(/[^a-zA-Z]+/g, "").toLowerCase()).remove();
		if (remoteVideos.querySelectorAll("video").length === 1) {
			remoteVideos.setAttribute("class", "one remoteVideos");
		} else {
			remoteVideos.setAttribute("class", "remoteVideos");
		}
	}

	getUserMediaDevices();
})();