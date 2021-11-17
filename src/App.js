import { useRef, useEffect, useMemo, useState } from 'react';
import './App.css';
import { NavBar } from "./components/common/navbar/NavBar";
import Microphone from "./components/common/microphone/Microphone";
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getWayConnection } from './components/socket/getWayConnect';
import { Preloader } from './components/common/preloader/Preloader'
import { getWayWebSocket, mainRoot, mainServerRoot, pathForWebSocket } from './components/socket/constants';
import { WSSSContext } from './utils/Context';
import { initializeApp, setLinkForSS } from './components/redux/appReducer';
import { chatRoom1 } from './components/common/chatRooms/rooms/СhatRoom1';
import { ChatBar } from './components/common/chatRooms/chatBar';
import { Main } from './components/common/main/Main'
import { io } from 'socket.io-client';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [])


  //ref for ws
  const socket = useRef(io(`https://${mainServerRoot}/`, {
    path: pathForWebSocket,
  }));

  const [contextWSSS, setContextWSSS] = useState({
    linkForSS: '',
    sessionTokenForSS: '',
    userUUID: '',
    type: '',
    lobbyUUID: ''
  })

  const [lobbyUUID, setLobbyUUID] = useState('');
  const [isAudio, setIsAudio] = useState(false);
  const [isVideo, setIsVideo] = useState(false);


  //get initial data for GetWay and SoundServer
  const linkForSS = useSelector(state => state.app.linkForSS)
  const sessionTokenForSS = useSelector(state => state.users.self.session_uuid)
  const userUUID = useSelector(state => state.users.self.user_uuid)
  const getConnectionType = useSelector(state => state.app.type)

  //get users from store
  const getUsersFromStore = useSelector(state => state.users.users)

  useMemo(() => {
    setContextWSSS({ linkForSS, sessionTokenForSS, userUUID, getConnectionType, lobbyUUID })
  }, [linkForSS, sessionTokenForSS, userUUID, getConnectionType, lobbyUUID])


  return (
    <WSSSContext.Provider value={contextWSSS}>
      <div className="home" style={{ textAlign: "center" }}>

        <NavBar
          getUsersFromStore={getUsersFromStore}
          record={isAudio}
          setIsAudio={setIsAudio}
        />
        <Switch>

          <Route exact path={mainRoot} render={() => <Main lobbyUUID={lobbyUUID} setLobbyUUID={setLobbyUUID} sessionUUID={sessionTokenForSS} />} />
          <Route exact path={mainRoot + `/lobby/${lobbyUUID}`} render={() => <ChatBar
            getUsersFromStore={getUsersFromStore}
            isAudio={isAudio}
            setIsAudio={setIsAudio}
            isVideo={isVideo}
            setIsVideo={setIsVideo}
            linkForSS={linkForSS}
            socket={socket.current}
          />} />

          <Route path='*'
            render={() => <div> 404 Page not found!</div>} />
        </Switch>

      </div>
    </WSSSContext.Provider >
  );
}

export default App;
