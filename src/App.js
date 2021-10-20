import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import './App.css';
import { NavBar } from "./components/common/navbar/NavBar";
import Microphone from "./components/common/microphone/Microphone";
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getWayConnection } from './components/socket/getWayConnect';
import { sendPlayerTick } from './components/socket/serverConnection';
import { Preloader } from './components/common/preloader/Preloader'
import { getWayWebSocket, mainRoot } from './components/socket/constants';
import { WSSSContext } from './utils/Context';
import { setLinkForSS, setSessionUserUUID } from './components/redux/appReducer';
import { chatRoom1 } from './components/common/chatRooms/rooms/СhatRoom1';
import { ChatBar } from './components/common/chatRooms/chatBar';
import { Main } from './components/common/main/Main'

function App() {

  const dispatch = useDispatch();

  const [loadinglink, setLoaded] = useState(false);

  const [contextWSSS, setContextWSSS] = useState({
    linkForSS: '',
    sessionTokenForSS: '',
    userUUIDForSS: '',
    type: ''
  })

  const [lobbyUUID, setLobbyUUID] = useState('');

  //get initial data for SS
  const linkIsFetched = useSelector(state => state.app.linkIsFetched)
  const linkForSS = useSelector(state => state.app.linkForSS)
  const sessionTokenForSS = useSelector(state => state.app.sessionToken)
  const userUUIDForSS = useSelector(state => state.app.userUUID)
  const getConnectionType = useSelector(state => state.app.type)

  //get users from store
  const getUsersFromStore = useSelector(state => state.users.users)


  useMemo(() => {
    dispatch(setLinkForSS);
    dispatch(setSessionUserUUID);
    setContextWSSS({ linkForSS, sessionTokenForSS, userUUIDForSS, getConnectionType })

  }, [linkForSS, sessionTokenForSS, userUUIDForSS, getConnectionType])

  // useEffect(() => {
  //   getWayConnection()
  // }, [])


  useMemo(() => {
    setLoaded(linkIsFetched)
  }, [linkIsFetched]);




  return (
    <WSSSContext.Provider value={contextWSSS}>
      <div className="home" style={{ textAlign: "center" }}>

        <NavBar getUsersFromStore={getUsersFromStore} />
        <Switch>

          <Route exact path={mainRoot} render={() => <Main lobbyUUID={lobbyUUID} setLobbyUUID={setLobbyUUID} />} />
          <Route exact path={mainRoot + `/lobby/${lobbyUUID}`} render={() => <ChatBar getUsersFromStore={getUsersFromStore} />} />

          <Route path='*'
            render={() => <div> 404 Page not found!</div>} />
        </Switch>

      </div>
    </WSSSContext.Provider >
  );
}

export default App;
