import { timeInterval } from "../socket/constatns";
import { sendPlayerTick } from "../socket/serverConnection";


let maxVolPerTime = 0		//!!!!!! не нравится. Сделать через редакс?


export const OutputPlayerAudio = audioBuffer => {

	const outputBlob = new Blob([audioBuffer], {
		type: "audio/webm;codecs=opus",
	});

	const fileReader = new FileReader();
	fileReader.readAsDataURL(outputBlob);
	fileReader.onloadend = () => {
		const base64String = fileReader.result;
		//socket.emit("voice", base64String);
		const audio = new Audio(base64String);
		audio.play();
	};
}

const AnalyticVoice = stream => {
	const audioContext = new (window.AudioContext ||
		window.webkitAudioContext)();
	const analyser = audioContext.createAnalyser();
	const microphone = audioContext.createMediaStreamSource(stream);
	const javascriptNode =
		audioContext.createScriptProcessor(2048, 1, 1);
	const documentVolLevelElement = document.querySelector(
		".volLevel"
	);
	const documentMaxVolLevelElement = document.querySelector(
		".maxLevel"
	);

	// Init PIDS HTML
	const pidsElements = [];
	let pids = document.querySelectorAll(".pid");
	pids.forEach((pid) => {
		pidsElements.push(pid);
	});
	//

	// ANIMATION PIDS HTML
	const colorPids = (vol) => {
		let amout_of_pids = Math.round(vol / 5);
		let elem_range = pidsElements.slice(0, amout_of_pids);
		for (let i = 0; i < pidsElements.length; i++) {
			pidsElements[i].style.backgroundColor = "#e6e7e8";
		}
		for (let i = 0; i < elem_range.length; i++) {
			elem_range[i].style.backgroundColor = "#69ce2b";
		}
	};

	analyser.smoothingTimeConstant = 0.8;
	analyser.fftSize = 1024;

	microphone.connect(analyser);
	analyser.connect(javascriptNode);
	javascriptNode.connect(audioContext.destination);

	javascriptNode.addEventListener("audioprocess", () => {
		const array = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(array);
		let values = 0;

		const length = array.length;
		for (let i = 0; i < length; i++) {
			values += array[i];
		}

		const average = values / length;

		// Write Max Vol
		if (average > 10 && average > maxVolPerTime) {
			maxVolPerTime = average;
		}

		documentMaxVolLevelElement.innerHTML =
			Math.round(maxVolPerTime);
		documentVolLevelElement.innerHTML = Math.round(average);
		colorPids(average);
	});
}

//start \ stop func for audio cathing
const startStopRec = (method) => {
	navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
		AnalyticVoice(stream);

		const mediaRecorder = new window.MediaRecorder(stream);
		let audioChunks = [];

		if (method === 'start') {

			mediaRecorder.start(timeInterval);
			console.log(mediaRecorder.state);

			setTimeout(() => {
				mediaRecorder.stop();
			}, timeInterval);
		}

		if (method === 'stop') {
			stream.getTracks() // get all tracks from the MediaStream
				.forEach(track => track.stop());
			mediaRecorder.stop();
			console.log(audioChunks);
			console.log('recording stopped. The state is: ' + mediaRecorder.state);
		}

		mediaRecorder.addEventListener(
			"dataavailable",
			(event) => {
				audioChunks.push(event.data);
				console.log(audioChunks, 'state is: ' + mediaRecorder.state);


				// const fileReader = new FileReader();
				// fileReader.readAsDataURL(event.data);
				// fileReader.onloadend = () => {
				//     if (!userStatus.microphone || !this.userStatus.online) return;

				//     const base64String = fileReader.result;
				//     console.log(base64String)
				//     socket.emit("voice", base64String);
				//     const audio = new Audio(base64String);
				//     audio.play();

				// };
			}
		);

		mediaRecorder.addEventListener("stop", () => {

			if (audioChunks.length > 0 && maxVolPerTime > 0) {
				const mimeType = audioChunks[0].type;
				const audioBlob = new Blob(audioChunks, { type: mimeType });

				audioBlob.arrayBuffer().then((arrayBuffer) => {
					const audioBuffer = new Uint8Array(arrayBuffer);

					// sendPlayerTick(audioBuffer);
				});
			}

			// if (mediaRecorder.state !== 'inactive') {
			// 	setTimeout(() => {
			// 		mediaRecorder.stop();
			// 	}, timeInterval);
			// }
		});
		// setTimeout(() => {
		// 	mediaRecorder.stop();
		// }, timeInterval);
	});
}

export const startRec = () => {
	startStopRec('start')
}
export const stopRec = () => {
	startStopRec('stop')
}

//блокировать кнопку старта записи после старта