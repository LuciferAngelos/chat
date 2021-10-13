import logo from './logo.svg';
import './App.css';
// import socket from './components/socket/socket';
import { ReactMic } from 'react-mic';
import { useEffect, useState } from 'react';

var socket = new WebSocket('wss:////getway.dev.viexpo.ru:8010/');
socket.onopen = function () {

  console.log("Соединение установлено.");
};

// navigator.getUserMedia = navigator.getUserMedia ||
//   navigator.webkitGetUserMedia ||
//   navigator.mozGetUserMedia;

// if (navigator.getUserMedia) {
//   navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
//     function (stream) {
//       console.log("Accessed the Microphone");
//     },
//     function (err) {
//       console.log("The following error occured: " + err.name);
//     }
//   );
// } else {
//   console.log("getUserMedia not supported");
// }

function App() {

  let [record, setRecord] = useState(false)
  let [dataOnStop, setDataOnStop] = useState([])
  let [dataChunk, setDataChunk] = useState([])



  const setOnStop = (recordedBlob) => {
    setDataOnStop([...dataOnStop, recordedBlob])
    console.log(recordedBlob, dataOnStop);
  }

  // const setOnDataChunk = (dataBlob) => {
  //   setDataChunk(...dataChunk, dataBlob)
  //   console.log('This is a recorded Blob', dataBlob);

  // }



  return (
    <div className="App">
      {!record && <div style={{ margin: '0 auto', marginTop: '5rem', height: '10px', width: '80%', backgroundColor: '#000' }}></div>}
      <ReactMic
        record={record}         // defaults -> false.  Set to true to begin recording
        pause={true}          // defaults -> false (available in React-Mic-Gold)
        visualSetting="frequencyBars" // defaults -> "sinewave".  Other option is "frequencyBars"
        onStop={setOnStop}                   // required - called when audio stops recording
        /* onData={setOnDataChunk}  */                  // optional - called when chunk of audio data is available

        /*   className={string}                   // provide css class name
          onBlock={function}                  // optional - called if user selected "block" when prompted to allow microphone access (available in React-Mic-Gold)
          strokeColor={string}                // sinewave or frequency bar color
          backgroundColor={string} */             // background color
        mimeType="audio/webm"     // defaults -> "audio/webm".  Set to "audio/wav" for WAV or "audio/mp3" for MP3 audio format (available in React-Mic-Gold)
        echoCancellation={true} // defaults -> false
        autoGainControl={true}  // defaults -> false
        noiseSuppression={true} // defaults -> false
        channelCount={2}     // defaults -> 2 (stereo).  Specify 1 for mono.
        bitRate={256000}          // defaults -> 128000 (128kbps).  React-Mic-Gold only.
        sampleRate={96000}        // defaults -> 44100 (44.1 kHz).  It accepts values only in range: 22050 to 96000 (available in React-Mic-Gold)
        timeSlice={1000}          // defaults -> 4000 milliseconds.  The interval at which captured audio is returned to onData callback (available in React-Mic-Gold).
      />

      <button onClick={() => { setRecord(!record) }}>Record and not</button>
    </div>
  );
}

export default App;
