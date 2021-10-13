import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import './App.css';

import Grid from "@material-ui/core/Grid";

import NavBar from "./components/common/navbar/NavBar";
import Microphone from "./components/common/microphone/Microphone";
import AudioPlayer from "./components/common/audioPlayer/AudioPlayer";
import { useDispatch, useSelector } from 'react-redux'
// import { startRec, stopRec } from './components/micRecorder/mainRecorderSettings';
import { getWayConnection } from './components/socket/getWayConnect';
import { sendPlayerTick } from './components/socket/serverConnection';
import { Preloader } from './components/common/preloader/Preloader'
import { getWayWebSocket } from './components/socket/constatns';
import { WSSSContext } from './utils/Context';
import { setLinkForSS, setSessionUserUUID } from './components/redux/appReducer';


function App() {

  const dispatch = useDispatch();

  const [loadinglink, setLoaded] = useState(false);

  const [contextWSSS, setContextWSSS] = useState({
    linkForSS: '',
    sessionTokenForSS: '',
    userUUIDForSS: ''
  })

  //git initial data for SS
  const linkIsFetched = useSelector(state => state.app.linkIsFetched)
  const linkForSS = useSelector(state => state.app.linkForSS)
  const sessionTokenForSS = useSelector(state => state.app.sessionToken)
  const userUUIDForSS = useSelector(state => state.app.userUUID)

  useMemo(() => {
    dispatch(setLinkForSS);
    dispatch(setSessionUserUUID);
    setContextWSSS({ linkForSS: linkForSS, sessionTokenForSS: sessionTokenForSS, userUUIDForSS: userUUIDForSS })

  }, [linkForSS, sessionTokenForSS, userUUIDForSS])

  useCallback(() => { }, [])

  useEffect(() => {
    getWayConnection(getWayWebSocket)
  }, [])


  useMemo(() => {
    setLoaded(linkIsFetched)
  }, [linkIsFetched]);

  useEffect(() => {

  }, [])


  const [files, setFiles] = useState([]);
  const [currentAvatarId, setCurrentAvatarId] = useState(0)

  const pushFile = file => {
    setFiles([...files, file]);
  };

  return (
    <WSSSContext.Provider value={contextWSSS}>
      <div className="home" style={{ textAlign: "center" }}>
        {!loadinglink
          ?
          <Preloader />
          :
          <div>
            <NavBar

            />
            <Microphone pushFile={pushFile} setCurrentAvatarId={setCurrentAvatarId} />
            <Grid container direction="column" spacing={3}>
              {files.map((file, index) => (
                <Grid key={index} item>
                  <AudioPlayer file={file} currentAvatarId={currentAvatarId} />
                </Grid>
              ))}
            </Grid>
          </div>

        }
      </div>
    </WSSSContext.Provider>
  );
}

export default App;
