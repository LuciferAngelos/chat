export const createVideo = (myId, videoContainer, createObj, videoDestination, whoseVideo) => {
	if (!videoContainer[createObj.id]) {
		videoContainer[createObj.id] = { ...createObj };

		console.log(videoContainer);
		const roomContainer = videoDestination;
		const video = document.createElement('video');

		//0 for my video, 1 for incoming video
		if (whoseVideo === 0) {
			video.classList.add('internalVideo');
		}
		if (whoseVideo === 1) {
			video.classList.add('externalVideo');
		}

		video.srcObject = videoContainer[createObj.id].stream;
		video.id = createObj.id;
		video.autoplay = true;
		if (myId === createObj.id) video.muted = true;
		roomContainer.append(video);
	} else {
		return
	}
}