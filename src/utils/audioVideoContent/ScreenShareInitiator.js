export const getScreen = () => {
	const myDispplay = navigator.mediaDevices.getDisplayMedia({
		video: {
			cursor: 'always'
		},
		audio: true
	});
	return myDispplay
}