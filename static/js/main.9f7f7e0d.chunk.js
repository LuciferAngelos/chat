(this["webpackJsonpvoice-chat"]=this["webpackJsonpvoice-chat"]||[]).push([[0],{156:function(e,t,n){},157:function(e,t,n){},191:function(e,t,n){},196:function(e,t){},197:function(e,t,n){},201:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),o=n(30),a=n.n(o),s=(n(156),n(12)),i=(n(157),n(113)),l=n(257),u=n(259),d=n(260),j=n(264),b=n(265),f=n(261),O=n(121),x=n.n(O),h=n(28),p=n(279),m=n(289),y=n(274),v=n(266),w="/chat",g="wss://getway.dev.viexpo.ru:8010",S=Object(c.createContext)(),U=n(47),k=n.n(U),E=n(53),T=n(23),_=n(19),C=n(116).create({baseURL:"https://getway.dev.viexpo.ru/api/"}),D=function(){return C.get("account/fake/get")},F="SET_USER_DATA",I="GET_CURRENT_USERS_LIST",L="USER_JOINED",R="USER_LEFT",A={users:[],self:{session_uuid:"",user_id:null,user_uuid:"",email:"",avatar:"",first_name:"",secon_name:"",last_name:"",phone:"",birthday:"",sex:"",company_uuid:"",company_name:"",company_position:"",company_role:null,system_role:null},isAuth:!1},N=function(e){return{type:F,payload:e}},P=n(2),B=function(e){var t=e.socket;return console.log("this is the socket => ",t),Object(P.jsxs)("div",{children:["sdfsdf",Object(P.jsx)("button",{onClick:function(){return t.close()},children:"close"})]})},M="INITIALIZED_SUCCESS",z="ON_LINK_GOTTEN",G="ON_DIALOG",J="GET_OUTPUT_PLAYER_VOICE_FROM_CLIENT",W="GET_OUTPUT_PLAYER_SCREEN_FROM_SERVER",V={initialized:!1,linkIsFetched:!1,linkForSS:"",type:1,onDialog:!1,outputPlayerVoiceFromClient:null,outputPlayerScreemFromSS:null},X=function(e){return{type:z,link:e}},Y=Object(l.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}})),H={position:"absolute",top:"6%",right:"10%",width:400,maxHeight:"70vh",bgcolor:"background.paper",boxShadow:24,p:4,border:"1px solid grey",overflow:"auto"};var K=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],c=!0===n?0:36,r="";!1===n&&(e.offset=t,r=e.readUtf8String(c)),e.offset=t+c+0;var o=e.readUInt32LE(),a={x:0,y:0,z:0};e.offset=t+c+4+0,a.x=e.readFloatLE(),e.offset=t+c+4+4,a.y=e.readFloatLE(),e.offset=t+c+4+8,a.z=e.readFloatLE(),e.offset=t+c+4+12;var s=e.readUInt8();return{uuid:r,id:o,position:a,state:s}},Z=(new AudioContext,function(e){var t=e.getUsersFromStore,n=e.setScreenBlob,r=e.record,o=Y(),a=Object(c.useState)(!1),l=Object(s.a)(a,2),O=l[0],w=l[1],g=Object(c.useState)(!1),U=Object(s.a)(g,2),k=U[0],E=U[1],T=Object(h.b)(),_=Object(c.useContext)(S),C=_.linkForSS,D=_.sessionTokenForSS,F=_.userUUID,A=_.getConnectionType,N=_.lobbyUUID,M=null,z=Object(c.useState)([]),G=Object(s.a)(z,2),J=G[0],W=G[1],V=Object(c.useRef)(null);return Object(c.useEffect)((function(){return C&&function e(){var t=C||console.log("Fetching the link...");M=new WebSocket(t),V.current=M,window.webSocketSS=M,M.binaryType="arraybuffer",M.onopen=function(){var e=new Uint8Array(77),t=new Uint8Array(new Uint32Array([0]).buffer),n=(new TextEncoder).encode(D),c=(new TextEncoder).encode(N);e.set(t,0),e.set(n,4),e.set(new Uint8Array([A]),40),e.set(c,41),M.send(e),1===M.readyState&&E(!0)},M.onmessage=function(e){var t=new i.BufferStream(e.data);t.offset=0;var c=t.readInt32LE();switch(c){case 9994:t.offset=4;for(var r=t.readUInt32LE(),o=[],a=0;a<r;a++){var s=K(t,8+53*a);s.uuid===F&&console.log("the uuid is the same"),o.push(s)}T(function(e){return{type:I,users:e}}(o)),console.log(JSON.stringify(o)),console.log("Method: FromMovement_FromPlayerScene_PlayerList, count: "+r,o);break;case 9992:var l=K(t,4);console.log("User Join: "+l.uuid),T(function(e){return{type:L,user:e}}(l));break;case 9993:t.offset=4;var u=t.readUtf8String(36);console.log("User Leave: "+u),T({type:R,userUuid:u});break;case 9996:K(t,4,!0);var d=new Uint8Array(t.buffer.buffer,21);n(new Blob([d],{type:"video/x-matroska;codecs=avc1"})),function(e){var t=new Blob([e],{type:"audio/webm;codecs=opus"}),n=new FileReader;n.readAsDataURL(t),n.onloadend=function(){var e=n.result,t=new Audio(e);t.addEventListener("canplay",(function(){t.play()}))}}(d);break;default:console.log("Method: Unknown")}console.log("WebSocket message received:",c)},M.onclose=function(t){console.log("Sound Server Socket closed. Trying to reconnect..."),console.log("Server closed with code => ",t.code),1!==M.readyState&&E(!1),1005!==t.code?setTimeout((function(){e()}),1e3):console.log("Socket was closed by user")},M.onerror=function(e){console.log("This error happened => ",e),M.close()};window.sendPlayerTick=function(e){return function(e,t,n){var c=new Uint8Array(17+n.byteLength),r=new Uint8Array(new Uint32Array([9991]).buffer);c.set(r,0),c.set(new Uint8Array(new Float32Array([e.x]).buffer),4),c.set(new Uint8Array(new Float32Array([e.y]).buffer),8),c.set(new Uint8Array(new Float32Array([e.z]).buffer),12),c.set(new Uint8Array([t]),16),c.set(n,17),1===M.readyState&&M.send(c)}({x:0,y:0,z:0},0,e)}}(),function(){(V.current||C)&&(V.current.close(),V.current=null)}}),[C]),Object(c.useMemo)((function(){k&&function e(){var t=setTimeout((function(){r?clearTimeout(t):(window.sendPlayerTick(new Uint8Array),e())}),4e3)}()}),[r,k]),Object(c.useMemo)((function(){W(t),console.log(J)}),[t,J]),Object(P.jsx)("div",{className:o.root,children:Object(P.jsx)(u.a,{position:"static",children:Object(P.jsxs)(d.a,{children:[Object(P.jsx)(f.a,{edge:"start",className:o.menuButton,color:"inherit","aria-label":"menu",children:Object(P.jsx)(x.a,{})}),Object(P.jsx)(B,{socket:V.current}),Object(P.jsxs)(j.a,{variant:"h6",className:o.title,children:["Connection Status:",k?" Connected!":" Disconnected!"]}),Object(P.jsx)(b.a,{color:"inherit",onClick:function(){return w(!0)},children:"Users List"}),Object(P.jsx)(y.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:O,onClose:function(){return w(!1)},closeAfterTransition:!0,BackdropComponent:p.a,BackdropProps:{timeout:500},children:Object(P.jsx)(v.a,{in:O,children:Object(P.jsxs)(m.a,{sx:H,children:[Object(P.jsx)(j.a,{id:"transition-modal-title",variant:"h6",component:"h2",children:"Users connected:"}),0!==t.length?t.map((function(e){return F===e.uuid?Object(P.jsxs)(j.a,{id:"transition-modal-description",sx:{mt:2},children:["Self: ",Object(P.jsx)("span",{style:{color:"red"},children:e.uuid})]},e.id):Object(P.jsxs)(j.a,{id:"transition-modal-description",sx:{mt:2},children:["User's UUID: ",Object(P.jsx)("span",{style:{color:"blue"},children:e.uuid})]},e.id)})):Object(P.jsx)(j.a,{id:"transition-modal-description",sx:{mt:2},children:"Waiting for users"})]})})})]})})})}),q=(n(190),n(123)),Q=n.n(q),$=n(124),ee=n.n($),te=n(126),ne=n.n(te),ce=n(125),re=n.n(ce),oe=n(269),ae=n(267),se=n(77),ie=(n(191),n(268)),le=(n(192),Object(l.a)((function(e){return{icon:{height:38,width:38},reactmic:{width:"80%",height:30},flex:{flex:1}}})));function ue(e){var t=e.size,n=e.record,r=e.setRecord,o=Object(c.useState)(!0),a=Object(s.a)(o,2),i=a[0],l=a[1];Object(c.useEffect)((function(){i||navigator.mediaDevices.getUserMedia({audio:{autoGainControl:!0,channelCount:1,echoCancellation:!1,delay:0,noiseSuppression:!1,sampleRate:48e3,sampleSize:16,volume:1},video:!1}).then((function(e){var t=new window.MediaRecorder(e);t.start(1e3),window.str=e;var n=[];t.addEventListener("dataavailable",(function(e){e.data.size>0&&n.push(e.data)})),t.addEventListener("stop",(function(){if(n.length>0){var e=n[0].type;new Blob(n,{type:e}).arrayBuffer().then((function(e){var c=new Uint8Array(e);window.sendPlayerTick(c),n=[],null!==window.str&&(t.start(1e3),setTimeout((function(){"inactive"!==t.state&&t.stop()}),1e3))}))}})),setTimeout((function(){"inactive"!==t.state&&t.stop()}),1e3)}))}),[i]);var u=function(){r(!0),l(!1)},d=function(){r(!1),l(!0),window.str.getTracks().forEach((function(e){e.stop()})),window.str=null},j=le();return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(ae.a,{container:!0,justifyContent:"center",children:Object(P.jsx)(ae.a,{item:!0,children:!n&&i?Object(P.jsx)(f.a,{onClick:u,children:Object(P.jsx)(Q.a,{className:j.icon,style:{width:t,height:t}})}):Object(P.jsx)(f.a,{onClick:d,children:Object(P.jsx)(ee.a,{className:j.icon,style:{width:t,height:t}})})})}),Object(P.jsx)(ie.a,{children:Object(P.jsx)(oe.a,{children:Object(P.jsx)(ae.a,{container:!0,children:Object(P.jsxs)(ae.a,{item:!0,container:!0,justifyContent:"center",xs:12,children:[!n&&i&&Object(P.jsx)(f.a,{onClick:u,children:Object(P.jsx)(re.a,{style:{color:se.a[500]},className:j.icon})}),n&&!i&&Object(P.jsx)(f.a,{onClick:d,children:Object(P.jsx)(ne.a,{className:j.icon})})]})})})})]})}var de=n(16),je=n(66),be=n(127),fe=Object(je.b)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case M:return Object(_.a)(Object(_.a)({},e),{},{initialized:!0});case G:return Object(_.a)(Object(_.a)({},e),{},{onDialog:!e.onDialog});case J:return Object(_.a)(Object(_.a)({},e),{},{outputPlayerVoiceFromClient:t.voice});case W:return Object(_.a)(Object(_.a)({},e),{},{outputPlayerScreemFromSS:t.screen});case z:return Object(_.a)(Object(_.a)({},e),{},{linkIsFetched:!0,linkForSS:t.link});default:return e}},users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case F:return Object(_.a)(Object(_.a)({},e),{},{self:Object(_.a)({},t.payload),isAuth:!0});case I:return Object(_.a)(Object(_.a)({},e),{},{users:t.users});case L:return Object(_.a)(Object(_.a)({},e),{},{users:[].concat(Object(T.a)(e.users),[t.user])});case R:return Object(_.a)(Object(_.a)({},e),{},{users:e.users.filter((function(e){return e.uuid!=t.userUuid}))});default:return e}}}),Oe=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||je.c,xe=Object(je.d)(fe,Oe(Object(je.a)(be.a)));window.__store__=xe;var he=xe;n(196),n.p;var pe=function(){return Object(P.jsxs)("div",{className:"lds-facebook",children:[Object(P.jsx)("div",{}),Object(P.jsx)("div",{}),Object(P.jsx)("div",{})]})},me=(n(270),n(282),n(8)),ye=n(280),ve=n(271),we=n(287),ge=n(283),Se=n(277),Ue=n(281),ke=n(278),Ee=n(286),Te=n(272),_e=n(91),Ce=n.n(_e),De=n(92),Fe=n.n(De),Ie=n(284),Le=n(90),Re=n.n(Le),Ae=n(94),Ne=n.n(Ae),Pe=["/tecpractice1","/tecpractice2","/tecpractice3","/tecpractice4","/tecpractice5","/tecpractice6"],Be=["/stand1","/stand2","/stand3","/stand4","/stand5","/stand6","/stand7","/stand8","/stand9","/stand10","/stand11","/stand12","/stand13","/stand14","/stand15","/stand16","/stand17","/stand18","/stand19","/stand20","/stand21","/stand22","/stand23"],Me=(n(197),n(45)),ze=c.forwardRef((function(e,t){return Object(P.jsx)("video",{ref:t,autoPlay:!0,height:"400",width:"100%"})})),Ge=["\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 1","\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 2","\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 3","\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 4 (Don't)","\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 5","\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 6"],Je={video:{cursor:"always"},audio:!1},We=function(e){var t=e.getUsersFromStore,n=e.screenBlob,r=e.setScreenBlob,o=e.record,a=e.setRecord,i=Object(h.b)(),l=Object(c.useContext)(S).userUUID,u=Object(c.useState)(!0),d=Object(s.a)(u,2),j=d[0],b=d[1],f=Object(c.useState)(!1),O=Object(s.a)(f,2),x=O[0],p=O[1],y=Object(c.useRef)(),v=y.current;function w(){return(w=Object(E.a)(k.a.mark((function e(){var t,n,c;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.mediaDevices.getDisplayMedia(Je);case 3:t=e.sent,console.log(v.srcObject),window.screenStream=t,n=new window.MediaRecorder(t),c=[],n.start(),n.addEventListener("dataavailable",(function(e){c.push(e.data)})),n.addEventListener("stop",(function(){if(c.length>0){var e=c[0].type;new Blob(c,{type:e}).arrayBuffer().then((function(e){var t=new Uint8Array(e);window.sendPlayerTick(t)}))}c=[],window.screenStream.active&&(n.start(),setTimeout((function(){"inactive"!==n.state&&n.stop()}),1e3))})),setTimeout((function(){"inactive"!==n.state&&n.stop()}),1e3),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.error("Error: "+e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})))).apply(this,arguments)}Object(c.useEffect)((function(){n&&(!function(e){var t=URL.createObjectURL(e);v.src=t}(n),r(null))}),[n]);return Object(P.jsx)(ae.a,{children:Object(P.jsxs)(m.a,{sx:{display:"flex"},children:[Object(P.jsx)(ve.a,{}),Object(P.jsxs)(ye.a,{variant:"permanent",sx:Object(me.a)({width:240,flexShrink:0},"& .MuiDrawer-paper",{marginTop:"5em",width:240,boxSizing:"border-box"}),children:[Object(P.jsxs)(m.a,{sx:{overflow:"auto"},children:[Object(P.jsxs)(we.a,{children:[Object(P.jsxs)(Te.a,{onClick:function(){b(!j)},children:[Object(P.jsx)(Ue.a,{children:Object(P.jsx)(Re.a,{})}),Object(P.jsx)(ke.a,{primary:"\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0438"}),j?Object(P.jsx)(Ce.a,{}):Object(P.jsx)(Fe.a,{})]}),Object(P.jsx)(Ee.a,{in:j,timeout:"auto",unmountOnExit:!0,children:Ge.map((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(P.jsx)(Me.b,{to:Pe[t],style:{textDecoration:"none",color:"inherit",display:"block"},activeClassName:"activeLink",exact:!0,children:Object(P.jsxs)(Se.a,{button:!0,sx:{pl:4},children:[Object(P.jsx)(Ue.a,{children:Object(P.jsx)(Ne.a,{})}),Object(P.jsx)(ke.a,{primary:e})]})},t)}))}),Object(P.jsx)(ge.a,{}),Object(P.jsxs)(Te.a,{onClick:function(){p(!x)},children:[Object(P.jsx)(Ue.a,{children:Object(P.jsx)(Re.a,{})}),Object(P.jsx)(ke.a,{primary:"\u0421\u0442\u0435\u043d\u0434\u044b"}),x?Object(P.jsx)(Ce.a,{}):Object(P.jsx)(Fe.a,{})]}),Object(P.jsx)(Ee.a,{in:x,timeout:"auto",unmountOnExit:!0,children:Be.map((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(P.jsx)(Me.b,{to:Be[t],style:{textDecoration:"none",color:"inherit",display:"block"},activeClassName:"activeLink",exact:!0,children:Object(P.jsxs)(Se.a,{button:!0,sx:{pl:4},children:[Object(P.jsx)(Ue.a,{children:Object(P.jsx)(Ne.a,{})}),Object(P.jsx)(ke.a,{primary:e})]})},t)}))})]}),Object(P.jsx)(ge.a,{})]}),Object(P.jsx)(ue,{size:"1.5em",record:o,setRecord:a})]}),Object(P.jsxs)(m.a,{sx:{width:"calc(100% - 240px)",display:"flex",flexDirection:"column"},children:[Object(P.jsxs)(m.a,{sx:{width:"100%",m:"1em auto",bgcolor:"background.paper",display:"flex",flexDirection:"row"},children:[Object(P.jsxs)(m.a,{component:"main",sx:{flexGrow:1,p:1},children:[Object(P.jsx)(ue,{size:"2em",record:o,setRecord:a}),Object(P.jsx)(de.c,{})]}),Object(P.jsx)(m.a,{sx:{marginTop:"2em",width:"100%",height:200,maxWidth:360,bgcolor:"background.paper"},children:Object(P.jsxs)(we.a,{children:[Object(P.jsx)(ke.a,{primary:"\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439"}),0!==t.length?t.map((function(e,t){return e.uuid===l?Object(P.jsx)(Se.a,{component:"div",disablePadding:!0,children:Object(P.jsx)(Te.a,{children:Object(P.jsx)(ke.a,{primary:"\u042f: ".concat(e.uuid),sx:{color:"red"}})})},t):Object(P.jsx)(Se.a,{component:"div",disablePadding:!0,children:Object(P.jsx)(Te.a,{children:Object(P.jsx)(ke.a,{primary:e.uuid})})},t)})):Object(P.jsx)(pe,{})]})})]}),Object(P.jsxs)(m.a,{sx:{width:"100%",margin:"0 auto",bgcolor:"background.paper",display:"flex",flexDirection:"row"},children:[Object(P.jsxs)(m.a,{sx:{marginLeft:".5em",display:"flex",flexDirection:"column",justifyContent:"flex-start"},children:[Object(P.jsx)(Ie.a,{sx:{marginBottom:"1em"},variant:"outlined",onClick:function(){return w.apply(this,arguments)},children:"\u041d\u0430\u0447\u0430\u0442\u044c \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0438\u044e"}),Object(P.jsx)(Ie.a,{variant:"outlined",onClick:function(){window.screenStream.getTracks().forEach((function(e){return e.stop()})),y.current.srcObject=null,i({type:W,screen:null})},children:"\u0417\u0430\u043a\u043e\u043d\u0447\u0438\u0442\u044c \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0438\u044e"})]}),Object(P.jsx)(ze,{ref:y})]})]})]})})},Ve=n(275),Xe=n(273),Ye=function(e){var t=e.sessionUUID,n=e.lobbyUUID,r=e.setLobbyUUID,o=function(){!function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,c=new WebSocket(g);function r(){c.onopen=function(){console.log("GetWay Socket connected"),c.send(JSON.stringify({method:0,token:e,type:n}))},c.onmessage=function(e){var n=JSON.parse(e.data);if(console.log(n),void 0!=n.method)switch(n.method){case 1:console.log(n.user),console.log(),c.send(JSON.stringify({method:7,lobby_uuid:t}));break;case 8:var r="wss://".concat(n.ip,":").concat(n.port);he.dispatch(X(r));break;default:console.log("Unexpected method")}},c.onclose=function(){console.log("GetWay websocket closed. trying to reconnect..."),setTimeout((function(){r()}),1e3)}}r()}(t,n,1)},a=Object(c.useCallback)((function(e){r(e.target.value)}),[n,r]);return Object(P.jsxs)(m.a,{sx:{m:2},children:[Object(P.jsxs)(m.a,{sx:{m:2},children:[Object(P.jsx)(m.a,{sx:{m:1},children:"\u041d\u0430\u0436\u043c\u0438 \u043d\u0430 \u043a\u043d\u043e\u043f\u043a\u0443, \u0447\u0442\u043e\u0431\u044b \u0432\u043e\u0439\u0442\u0438 \u0432 \u043e\u0431\u0449\u0443\u044e \u0433\u043e\u0432\u043e\u0440\u0438\u043b\u043a\u0443"}),Object(P.jsx)(Me.b,{exact:!0,to:"/chat/lobby",style:{textDecoration:"none",color:"inherit"},children:Object(P.jsx)(Ie.a,{variant:"outlined",onClick:o,children:"\u0412\u043e\u0439\u0442\u0438 \u0432 \u043e\u0431\u0449\u0435\u0435 \u043b\u043e\u0431\u0431\u0438"})})]}),Object(P.jsxs)(m.a,{sx:{marginTop:20},children:[Object(P.jsx)(m.a,{sx:{m:2},children:"\u0412\u0432\u0435\u0434\u0438 ID, \u0447\u0442\u043e\u0431\u044b \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u043a\u043e\u043c\u043d\u0430\u0442\u0443 \u0438\u043b\u0438 \u0437\u0430\u043a\u043e\u043d\u043d\u0435\u043a\u0442\u0438\u0442\u044c\u0441\u044f \u0432 \u043d\u0435\u0451"}),Object(P.jsxs)(Xe.a,{spacing:2,direction:"row",justifyContent:"center",children:[Object(P.jsx)(Ve.a,{onChange:a}),Object(P.jsx)(Me.b,{exact:!0,to:w+"/lobby/".concat(n),style:{textDecoration:"none",color:"inherit"},children:Object(P.jsx)(Ie.a,{variant:"outlined",onClick:o,children:"\u0412\u043e\u0439\u0442\u0438 \u0432 \u0441\u0442\u0435\u043d\u0434"})})]})]})]})};var He=function(){var e=Object(h.b)();Object(c.useEffect)((function(){e(function(){var e=Object(E.a)(k.a.mark((function e(t){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t(function(){var e=Object(E.a)(k.a.mark((function e(t){var n,c;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D();case 2:0===(n=e.sent).data.code&&(c=n.data.response.user,t(N(c)));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Promise.all([n]).then((function(){t({type:M})}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]);var t=Object(c.useState)(!1),n=Object(s.a)(t,2),r=(n[0],n[1]),o=Object(c.useState)({linkForSS:"",sessionTokenForSS:"",userUUID:"",type:"",lobbyUUID:""}),a=Object(s.a)(o,2),i=a[0],l=a[1],u=Object(c.useState)(null),d=Object(s.a)(u,2),j=d[0],b=d[1],f=Object(c.useState)(""),O=Object(s.a)(f,2),x=O[0],p=O[1],m=Object(c.useState)(!1),y=Object(s.a)(m,2),v=y[0],g=y[1],U=Object(h.c)((function(e){return e.app.linkIsFetched})),T=Object(h.c)((function(e){return e.app.linkForSS})),_=Object(h.c)((function(e){return e.users.self.session_uuid})),C=Object(h.c)((function(e){return e.users.self.user_uuid})),F=Object(h.c)((function(e){return e.app.type})),I=Object(h.c)((function(e){return e.users.users}));return Object(c.useMemo)((function(){e(X),l({linkForSS:T,sessionTokenForSS:_,userUUID:C,getConnectionType:F,lobbyUUID:x})}),[T,_,C,F,x]),Object(c.useMemo)((function(){r(U)}),[U]),Object(P.jsx)(S.Provider,{value:i,children:Object(P.jsxs)("div",{className:"home",style:{textAlign:"center"},children:[Object(P.jsx)(Z,{getUsersFromStore:I,setScreenBlob:b,record:v,setRecord:g}),Object(P.jsxs)(de.c,{children:[Object(P.jsx)(de.a,{exact:!0,path:w,render:function(){return Object(P.jsx)(Ye,{lobbyUUID:x,setLobbyUUID:p,sessionUUID:_})}}),Object(P.jsx)(de.a,{exact:!0,path:w+"/lobby/".concat(x),render:function(){return Object(P.jsx)(We,{getUsersFromStore:I,screenBlob:j,setScreenBlob:b,record:v,setRecord:g})}}),Object(P.jsx)(de.a,{path:"*",render:function(){return Object(P.jsx)("div",{children:" 404 Page not found!"})}})]})]})})},Ke=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,291)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),o(e),a(e)}))};a.a.render(Object(P.jsx)(r.a.StrictMode,{children:Object(P.jsx)(Me.a,{children:Object(P.jsx)(h.a,{store:he,children:Object(P.jsx)(He,{})})})}),document.getElementById("root")),Ke()}},[[201,1,2]]]);
//# sourceMappingURL=main.9f7f7e0d.chunk.js.map