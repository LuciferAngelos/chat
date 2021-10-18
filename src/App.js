import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import './App.css';
import { NavBar } from "./components/common/navbar/NavBar";
import Microphone from "./components/common/microphone/Microphone";
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getWayConnection } from './components/socket/getWayConnect';
import { sendPlayerTick } from './components/socket/serverConnection';
import { Preloader } from './components/common/preloader/Preloader'
import { getWayWebSocket } from './components/socket/constatns';
import { WSSSContext } from './utils/Context';
import { setLinkForSS, setSessionUserUUID } from './components/redux/appReducer';
import { chatRoom1 } from './components/common/chatRooms/rooms/СhatRoom1';
import { ChatBar } from './components/common/chatRooms/chatBar';


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


  const [currentAvatarId, setCurrentAvatarId] = useState(0)



  return (
    <WSSSContext.Provider value={contextWSSS}>
      <div className="home" style={{ textAlign: "center" }}>
        {!loadinglink
          ?
          <Preloader />
          :
          <div>
            {/* <NavBar /> */}
            {/* <Microphone /> */}
            <ChatBar />
            {/* <Switch>
              <Route path='/' exact render={() => { <ChatBar /> }}> </Route>

              <Route path='*'
                render={() => <div> 404 Page not found!</div>} />
            </Switch> */}

          </div>

        }
      </div>
    </WSSSContext.Provider >
  );
}

export default App;
