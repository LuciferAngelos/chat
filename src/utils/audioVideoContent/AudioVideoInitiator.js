export const getVideoAudioStream = () => {
	const myNavigator = navigator.mediaDevices.getUserMedia ||
		navigator.mediaDevices.webkitGetUserMedia ||
		navigator.mediaDevices.mozGetUserMedia ||
		navigator.mediaDevices.msGetUserMedia;
	return myNavigator({
		video: {
			noiseSuppression: true,
			width: { min: 640, ideal: 1280, max: 1920 },
			height: { min: 480, ideal: 720, max: 1080 }
		},
		audio: {
			echoCancellation: true,
			noiseSuppression: true
		}
	});
}