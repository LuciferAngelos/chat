(this["webpackJsonpvoice-chat"]=this["webpackJsonpvoice-chat"]||[]).push([[0],{156:function(e,t,n){},157:function(e,t,n){},190:function(e,t,n){},191:function(e,t){},192:function(e,t,n){},197:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),o=n(30),a=n.n(o),s=(n(156),n(12)),i=(n(157),n(86)),l=n(114),u=n(255),d=n(257),j=n(258),b=n(262),O=n(263),f=n(259),x=n(121),h=n.n(x),p=n(28),m=n(277),y=n(287),g=n(272),v=n(264),w="/chat",S="wss://getway.dev.viexpo.ru:8010",k=Object(c.createContext)(),U=n(47),_=n.n(U),E=n(53),C=n(19),T=n(23),D=i.create({baseURL:"https://getway.dev.viexpo.ru/api/"}),F=function(){return D.get("account/fake/get")},I="SET_USER_DATA",L="GET_CURRENT_USERS_LIST",A="USER_JOINED",N="USER_LEFT",P={users:[],self:{session_uuid:"",user_id:null,user_uuid:"",email:"",avatar:"",first_name:"",secon_name:"",last_name:"",phone:"",birthday:"",sex:"",company_uuid:"",company_name:"",company_position:"",company_role:null,system_role:null},isAuth:!1},R=function(e){return{type:I,payload:e}},M="INITIALIZED_SUCCESS",B="ON_LINK_GOTTEN",z="ON_DIALOG",G="GET_OUTPUT_PLAYER_VOICE_FROM_CLIENT",V="GET_OUTPUT_PLAYER_VOICE_FROM_SERVER",J={initialized:!1,linkIsFetched:!1,linkForSS:"",type:1,onDialog:!1,outputPlayerVoiceFromClient:null,outputPlayerVoiceFromSS:null},W=function(e){return{type:B,link:e}},X=n(2),Y=function(e){var t=e.socket;return console.log("this is the socket => ",t),Object(X.jsxs)("div",{children:["sdfsdf",Object(X.jsx)("button",{onClick:function(){return t.close()},children:"close"})]})},q=Object(u.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}})),H={position:"absolute",top:"6%",right:"10%",width:400,maxHeight:"70vh",bgcolor:"background.paper",boxShadow:24,p:4,border:"1px solid grey",overflow:"auto"};var K=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],c=!0===n?0:36,r="";!1===n&&(e.offset=t,r=e.readUtf8String(c)),e.offset=t+c+0;var o=e.readUInt32LE(),a={x:0,y:0,z:0};e.offset=t+c+4+0,a.x=e.readFloatLE(),e.offset=t+c+4+4,a.y=e.readFloatLE(),e.offset=t+c+4+8,a.z=e.readFloatLE(),e.offset=t+c+4+12;var s=e.readUInt8();return{uuid:r,id:o,position:a,state:s}},Z=function(e){var t=e.getUsersFromStore,n=q(),r=Object(c.useState)(!1),o=Object(s.a)(r,2),a=o[0],i=o[1],u=Object(c.useState)(!1),x=Object(s.a)(u,2),w=x[0],S=x[1],U=Object(p.b)(),_=Object(c.useContext)(k),E=_.linkForSS,C=_.sessionTokenForSS,T=_.userUUID,D=_.getConnectionType,F=_.lobbyUUID,I=null,P=Object(c.useState)([]),R=Object(s.a)(P,2),M=R[0],B=R[1],z=Object(c.useRef)(null);return Object(c.useEffect)((function(){return E&&function e(){var t=E||console.log("Fetching the link...");I=new WebSocket(t),z.current=I,window.webSocketSS=I,I.binaryType="arraybuffer",I.onopen=function(){var e=new Uint8Array(77),t=new Uint8Array(new Uint32Array([0]).buffer),n=(new TextEncoder).encode(C),c=(new TextEncoder).encode(F);console.log(F),e.set(t,0),e.set(n,4),e.set(new Uint8Array([D]),40),e.set(c,41),I.send(e),1===I.readyState&&S(!0)},I.onmessage=function(e){var t=new l.BufferStream(e.data);t.offset=0;var n=t.readInt32LE();switch(n){case 9994:t.offset=4;for(var c=t.readUInt32LE(),r=[],o=0;o<c;o++){var a=K(t,8+53*o);a.uuid===T&&console.log("the uuid is the same"),r.push(a)}U(function(e){return{type:L,users:e}}(r)),console.log(JSON.stringify(r)),console.log("Method: FromMovement_FromPlayerScene_PlayerList, count: "+c,r);break;case 9992:console.log("the message => ",t);var s=K(t,4);console.log("User Join: "+s.uuid),U(function(e){return{type:A,user:e}}(s));break;case 9993:t.offset=4;var i=t.readUtf8String(36);console.log("User Leave: "+i),U({type:N,userUuid:i});break;case 9996:var u=K(t,4,!0);!function(e){var t=new Blob([e],{type:"audio/webm;codecs=opus"}),n=new FileReader;n.readAsDataURL(t),n.onloadend=function(){var e=n.result,t=new Audio(e);t.addEventListener("canplaythrough",(function(){t.play()}))}}(new Uint8Array(t.buffer.buffer,21)),console.log("FromSound_FromPlayerScene_PlayerVoice => ",u);break;default:console.log("Method: Unknown")}console.log("WebSocket message received:",n)},I.onclose=function(t){console.log("Sound Server Socket closed. Trying to reconnect..."),console.log("Server closed with code => ",t.code),1!==I.readyState&&S(!1),1005!==t.code?setTimeout((function(){e(),console.log(I.readyState)}),1e3):console.log("Socket was closed by user")},I.onerror=function(e){console.log("This error happened => ",e),I.close()};window.sendPlayerTick=function(e){return function(e,t,n){console.log("the voice body is ",e,t,n);var c=new Uint8Array(17+n.byteLength),r=new Uint8Array(new Uint32Array([9991]).buffer);c.set(r,0),c.set(new Uint8Array(new Float32Array([e.x]).buffer),4),c.set(new Uint8Array(new Float32Array([e.y]).buffer),8),c.set(new Uint8Array(new Float32Array([e.z]).buffer),12),c.set(new Uint8Array([t]),16),c.set(n,17),1===I.readyState&&I.send(c)}({x:0,y:0,z:0},0,e)}}(),function(){(z.current||E)&&(z.current.close(),z.current=null)}}),[E]),Object(c.useMemo)((function(){B(t),console.log(M)}),[t,M]),Object(X.jsx)("div",{className:n.root,children:Object(X.jsx)(d.a,{position:"static",children:Object(X.jsxs)(j.a,{children:[Object(X.jsx)(f.a,{edge:"start",className:n.menuButton,color:"inherit","aria-label":"menu",children:Object(X.jsx)(h.a,{})}),Object(X.jsx)(Y,{socket:z.current}),Object(X.jsxs)(b.a,{variant:"h6",className:n.title,children:["Connection Status:",w?" Connected!":" Disconnected!"]}),Object(X.jsx)(O.a,{color:"inherit",onClick:function(){return i(!0)},children:"Users List"}),Object(X.jsx)(g.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:a,onClose:function(){return i(!1)},closeAfterTransition:!0,BackdropComponent:m.a,BackdropProps:{timeout:500},children:Object(X.jsx)(v.a,{in:a,children:Object(X.jsxs)(y.a,{sx:H,children:[Object(X.jsx)(b.a,{id:"transition-modal-title",variant:"h6",component:"h2",children:"Users connected:"}),0!==t.length?t.map((function(e){return T===e.uuid?Object(X.jsxs)(b.a,{id:"transition-modal-description",sx:{mt:2},children:["Self: ",Object(X.jsx)("span",{style:{color:"red"},children:e.uuid})]},e.id):Object(X.jsxs)(b.a,{id:"transition-modal-description",sx:{mt:2},children:["User's UUID: ",Object(X.jsx)("span",{style:{color:"blue"},children:e.uuid})]},e.id)})):Object(X.jsx)(b.a,{id:"transition-modal-description",sx:{mt:2},children:"Waiting for users"})]})})})]})})})},Q=n(123),$=n(124),ee=n.n($),te=n(125),ne=n.n(te),ce=n(127),re=n.n(ce),oe=n(126),ae=n.n(oe),se=n(267),ie=n(265),le=n(77),ue=(n(190),n(266)),de=Object(u.a)((function(e){return{icon:{height:38,width:38},reactmic:{width:"80%",height:30},flex:{flex:1}}}));function je(e){var t=e.size,n=(Object(p.b)(),Object(c.useState)(!1)),r=Object(s.a)(n,2),o=r[0],a=r[1],i=Object(c.useState)(!1),l=Object(s.a)(i,2),u=(l[0],l[1],Object(c.useState)(!0)),d=Object(s.a)(u,2),j=d[0],b=d[1],O=Object(c.useState)(!1),x=Object(s.a)(O,2),h=(x[0],x[1],Object(c.useState)(!1)),m=Object(s.a)(h,2);m[0],m[1],Object(c.useRef)(null);Object(c.useEffect)((function(){j||navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,sampleRate:44100}}).then((function(e){var t=new window.MediaRecorder(e),n=[];console.log(e.getAudioTracks()),t.start(),window.str=e,t.addEventListener("dataavailable",(function(e){n.push(e.data)})),t.addEventListener("stop",(function(){if(n.length>0){var e=n[0].type;new Blob(n,{type:e}).arrayBuffer().then((function(e){var t=new Uint8Array(e);window.sendPlayerTick(t)}))}n=[],null!==window.str&&(t.start(),setTimeout((function(){"inactive"!==t.state&&t.stop()}),1e3))})),setTimeout((function(){"inactive"!==t.state&&t.stop()}),1e3)}))}),[o,j]);var y=function(){a(!0),b(!1)};var g=function(){a(!1),b(!0),window.str.getAudioTracks().forEach((function(e){e.stop()})),window.str=null},v=de();return Object(X.jsxs)(X.Fragment,{children:[Object(X.jsx)(ie.a,{container:!0,justifyContent:"center",children:Object(X.jsx)(ie.a,{item:!0,children:!o&&j?Object(X.jsx)(f.a,{onClick:y,children:Object(X.jsx)(ee.a,{className:v.icon,style:{width:t,height:t}})}):Object(X.jsx)(f.a,{onClick:g,children:Object(X.jsx)(ne.a,{className:v.icon,style:{width:t,height:t}})})})}),Object(X.jsxs)(ue.a,{children:[Object(X.jsx)(Q.ReactMic,{record:o,className:v.reactmic,visualSetting:"frequencyBars",echoCancellation:!0,noiseSuppression:!0,onStop:function(){},onData:function(e){},strokeColor:"green",backgroundColor:"white"}),Object(X.jsx)(se.a,{children:Object(X.jsx)(ie.a,{container:!0,children:Object(X.jsxs)(ie.a,{item:!0,container:!0,justifyContent:"center",xs:12,children:[!o&&j&&Object(X.jsx)(f.a,{onClick:y,children:Object(X.jsx)(ae.a,{style:{color:le.a[500]},className:v.icon})}),o&&!j&&Object(X.jsx)(f.a,{onClick:g,children:Object(X.jsx)(re.a,{className:v.icon})})]})})})]})]})}var be=n(16),Oe=n(66),fe=n(128),xe=Object(Oe.b)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case M:return Object(C.a)(Object(C.a)({},e),{},{initialized:!0});case z:return Object(C.a)(Object(C.a)({},e),{},{onDialog:!e.onDialog});case G:return Object(C.a)(Object(C.a)({},e),{},{outputPlayerVoiceFromClient:t.voice});case V:return Object(C.a)(Object(C.a)({},e),{},{outputPlayerVoiceFromSS:t.voice});case B:return Object(C.a)(Object(C.a)({},e),{},{linkIsFetched:!0,linkForSS:t.link});default:return e}},users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case I:return Object(C.a)(Object(C.a)({},e),{},{self:Object(C.a)({},t.payload),isAuth:!0});case L:return Object(C.a)(Object(C.a)({},e),{},{users:t.users});case A:return Object(C.a)(Object(C.a)({},e),{},{users:[].concat(Object(T.a)(e.users),[t.user])});case N:return Object(C.a)(Object(C.a)({},e),{},{users:e.users.filter((function(e){return e.uuid!=t.userUuid}))});default:return e}}}),he=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Oe.c,pe=Object(Oe.d)(xe,he(Object(Oe.a)(fe.a)));window.__store__=pe;var me=pe;n(191),n.p;var ye=function(){return Object(X.jsxs)("div",{className:"lds-facebook",children:[Object(X.jsx)("div",{}),Object(X.jsx)("div",{}),Object(X.jsx)("div",{})]})},ge=(n(268),n(280),n(8)),ve=n(278),we=n(269),Se=n(285),ke=n(281),Ue=n(275),_e=n(279),Ee=n(276),Ce=n(284),Te=n(270),De=n(92),Fe=n.n(De),Ie=n(93),Le=n.n(Ie),Ae=n(282),Ne=n(91),Pe=n.n(Ne),Re=n(95),Me=n.n(Re),Be=["/tecpractice1","/tecpractice2","/tecpractice3","/tecpractice4","/tecpractice5","/tecpractice6"],ze=["/stand1","/stand2","/stand3","/stand4","/stand5","/stand6","/stand7","/stand8","/stand9","/stand10","/stand11","/stand12","/stand13","/stand14","/stand15","/stand16","/stand17","/stand18","/stand19","/stand20","/stand21","/stand22","/stand23"],Ge=(n(192),n(45)),Ve=c.forwardRef((function(e,t){return Object(X.jsx)("video",{ref:t,autoPlay:!0,height:"400",width:"100%"})})),Je=["\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 1","\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 2","\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 3","\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 4 (Don't)","\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 5","\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 6"],We={video:{cursor:"always"},audio:!1},Xe=function(e){var t=e.getUsersFromStore,n=Object(c.useContext)(k).userUUID,o=Object(c.useState)(!0),a=Object(s.a)(o,2),i=a[0],l=a[1],u=Object(c.useState)(!1),d=Object(s.a)(u,2),j=d[0],b=d[1],O=r.a.createRef(),f=Object(c.useState)(null),x=Object(s.a)(f,2),h=x[0];x[1];function p(){return(p=Object(E.a)(_.a.mark((function e(){var t;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=O.current,e.next=4,navigator.mediaDevices.getDisplayMedia(We);case 4:t.srcObject=e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Error: "+e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}return Object(X.jsx)(ie.a,{children:Object(X.jsxs)(y.a,{sx:{display:"flex"},children:[Object(X.jsx)(we.a,{}),Object(X.jsxs)(ve.a,{variant:"permanent",sx:Object(ge.a)({width:240,flexShrink:0},"& .MuiDrawer-paper",{marginTop:"5em",width:240,boxSizing:"border-box"}),children:[Object(X.jsxs)(y.a,{sx:{overflow:"auto"},children:[Object(X.jsxs)(Se.a,{children:[Object(X.jsxs)(Te.a,{onClick:function(){l(!i)},children:[Object(X.jsx)(_e.a,{children:Object(X.jsx)(Pe.a,{})}),Object(X.jsx)(Ee.a,{primary:"\u0422\u0435\u0445\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0438"}),i?Object(X.jsx)(Fe.a,{}):Object(X.jsx)(Le.a,{})]}),Object(X.jsx)(Ce.a,{in:i,timeout:"auto",unmountOnExit:!0,children:Je.map((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(X.jsx)(Ge.b,{to:Be[t],style:{textDecoration:"none",color:"inherit",display:"block"},activeClassName:"activeLink",exact:!0,children:Object(X.jsxs)(Ue.a,{button:!0,sx:{pl:4},children:[Object(X.jsx)(_e.a,{children:Object(X.jsx)(Me.a,{})}),Object(X.jsx)(Ee.a,{primary:e})]})},t)}))}),Object(X.jsx)(ke.a,{}),Object(X.jsxs)(Te.a,{onClick:function(){b(!j)},children:[Object(X.jsx)(_e.a,{children:Object(X.jsx)(Pe.a,{})}),Object(X.jsx)(Ee.a,{primary:"\u0421\u0442\u0435\u043d\u0434\u044b"}),j?Object(X.jsx)(Fe.a,{}):Object(X.jsx)(Le.a,{})]}),Object(X.jsx)(Ce.a,{in:j,timeout:"auto",unmountOnExit:!0,children:ze.map((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(X.jsx)(Ge.b,{to:ze[t],style:{textDecoration:"none",color:"inherit",display:"block"},activeClassName:"activeLink",exact:!0,children:Object(X.jsxs)(Ue.a,{button:!0,sx:{pl:4},children:[Object(X.jsx)(_e.a,{children:Object(X.jsx)(Me.a,{})}),Object(X.jsx)(Ee.a,{primary:e})]})},t)}))})]}),Object(X.jsx)(ke.a,{})]}),Object(X.jsx)(je,{size:"1.5em"})]}),Object(X.jsxs)(y.a,{sx:{width:"calc(100% - 240px)",display:"flex",flexDirection:"column"},children:[Object(X.jsxs)(y.a,{sx:{width:"100%",m:"1em auto",bgcolor:"background.paper",display:"flex",flexDirection:"row"},children:[Object(X.jsxs)(y.a,{component:"main",sx:{flexGrow:1,p:1},children:[Object(X.jsx)(je,{size:"2em"}),Object(X.jsx)(be.c,{})]}),Object(X.jsx)(y.a,{sx:{marginTop:"2em",width:"100%",height:200,maxWidth:360,bgcolor:"background.paper"},children:Object(X.jsxs)(Se.a,{children:[Object(X.jsx)(Ee.a,{primary:"\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439"}),0!==t.length?t.map((function(e,t){return e.uuid===n?Object(X.jsx)(Ue.a,{component:"div",disablePadding:!0,children:Object(X.jsx)(Te.a,{children:Object(X.jsx)(Ee.a,{primary:"\u042f: ".concat(e.uuid),sx:{color:"red"}})})},t):Object(X.jsx)(Ue.a,{component:"div",disablePadding:!0,children:Object(X.jsx)(Te.a,{children:Object(X.jsx)(Ee.a,{primary:e.uuid})})},t)})):Object(X.jsx)(ye,{})]})})]}),Object(X.jsxs)(y.a,{sx:{width:"100%",margin:"0 auto",bgcolor:"background.paper",display:"flex",flexDirection:"row"},children:[Object(X.jsxs)(y.a,{sx:{marginLeft:".5em",display:"flex",flexDirection:"column",justifyContent:"flex-start"},children:[Object(X.jsx)(Ae.a,{sx:{marginBottom:"1em"},variant:"outlined",onClick:function(){return p.apply(this,arguments)},children:"\u041d\u0430\u0447\u0430\u0442\u044c \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0438\u044e"}),Object(X.jsx)(Ae.a,{variant:"outlined",onClick:function(){O.current.srcObject.getTracks().forEach((function(e){return e.stop()})),O.current.srcObject=null},children:"\u0417\u0430\u043a\u043e\u043d\u0447\u0438\u0442\u044c \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0438\u044e"})]}),Object(X.jsx)(Ve,{ref:O,srcLink:h})]})]})]})})},Ye=n(273),qe=n(271),He=function(e){var t=e.sessionUUID,n=e.lobbyUUID,r=e.setLobbyUUID,o=function(){!function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,c=new WebSocket(S);function r(){c.onopen=function(){console.log("GetWay Socket connected"),c.send(JSON.stringify({method:0,token:e,type:n}))},c.onmessage=function(e){var n=JSON.parse(e.data);if(console.log(n),void 0!=n.method)switch(n.method){case 1:console.log(n.user),console.log(),c.send(JSON.stringify({method:7,lobby_uuid:t}));break;case 8:var r="wss://".concat(n.ip,":").concat(n.port);me.dispatch(W(r));break;default:console.log("Unexpected method")}},c.onclose=function(){console.log("GetWay websocket closed. trying to reconnect..."),setTimeout((function(){r()}),1e3)}}r()}(t,n,1)},a=Object(c.useCallback)((function(e){r(e.target.value)}),[n,r]);return Object(X.jsxs)(y.a,{sx:{m:2},children:[Object(X.jsxs)(y.a,{sx:{m:2},children:[Object(X.jsx)(y.a,{sx:{m:1},children:"\u041d\u0430\u0436\u043c\u0438 \u043d\u0430 \u043a\u043d\u043e\u043f\u043a\u0443, \u0447\u0442\u043e\u0431\u044b \u0432\u043e\u0439\u0442\u0438 \u0432 \u043e\u0431\u0449\u0443\u044e \u0433\u043e\u0432\u043e\u0440\u0438\u043b\u043a\u0443"}),Object(X.jsx)(Ge.b,{exact:!0,to:"/chat/lobby",style:{textDecoration:"none",color:"inherit"},children:Object(X.jsx)(Ae.a,{variant:"outlined",onClick:o,children:"\u0412\u043e\u0439\u0442\u0438 \u0432 \u043e\u0431\u0449\u0435\u0435 \u043b\u043e\u0431\u0431\u0438"})})]}),Object(X.jsxs)(y.a,{sx:{marginTop:20},children:[Object(X.jsx)(y.a,{sx:{m:2},children:"\u0412\u0432\u0435\u0434\u0438 ID, \u0447\u0442\u043e\u0431\u044b \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u043a\u043e\u043c\u043d\u0430\u0442\u0443 \u0438\u043b\u0438 \u0437\u0430\u043a\u043e\u043d\u043d\u0435\u043a\u0442\u0438\u0442\u044c\u0441\u044f \u0432 \u043d\u0435\u0451"}),Object(X.jsxs)(qe.a,{spacing:2,direction:"row",justifyContent:"center",children:[Object(X.jsx)(Ye.a,{onChange:a}),Object(X.jsx)(Ge.b,{exact:!0,to:w+"/lobby/".concat(n),style:{textDecoration:"none",color:"inherit"},children:Object(X.jsx)(Ae.a,{variant:"outlined",onClick:o,children:"\u0412\u043e\u0439\u0442\u0438 \u0432 \u0441\u0442\u0435\u043d\u0434"})})]})]})]})};var Ke=function(){var e=Object(p.b)();Object(c.useEffect)((function(){e(function(){var e=Object(E.a)(_.a.mark((function e(t){var n;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t(function(){var e=Object(E.a)(_.a.mark((function e(t){var n,c;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F();case 2:0===(n=e.sent).data.code&&(c=n.data.response.user,t(R(c)));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Promise.all([n]).then((function(){t({type:M})}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]);var t=Object(c.useState)(!1),n=Object(s.a)(t,2),r=(n[0],n[1]),o=Object(c.useState)({linkForSS:"",sessionTokenForSS:"",userUUID:"",type:"",lobbyUUID:""}),a=Object(s.a)(o,2),i=a[0],l=a[1],u=Object(c.useState)(""),d=Object(s.a)(u,2),j=d[0],b=d[1],O=Object(p.c)((function(e){return e.app.linkIsFetched})),f=Object(p.c)((function(e){return e.app.linkForSS})),x=Object(p.c)((function(e){return e.users.self.session_uuid})),h=Object(p.c)((function(e){return e.users.self.user_uuid})),m=Object(p.c)((function(e){return e.app.type})),y=Object(p.c)((function(e){return e.users.users}));return Object(c.useMemo)((function(){e(W),l({linkForSS:f,sessionTokenForSS:x,userUUID:h,getConnectionType:m,lobbyUUID:j})}),[f,x,h,m,j]),Object(c.useMemo)((function(){r(O)}),[O]),Object(X.jsx)(k.Provider,{value:i,children:Object(X.jsxs)("div",{className:"home",style:{textAlign:"center"},children:[Object(X.jsx)(Z,{getUsersFromStore:y}),Object(X.jsxs)(be.c,{children:[Object(X.jsx)(be.a,{exact:!0,path:w,render:function(){return Object(X.jsx)(He,{lobbyUUID:j,setLobbyUUID:b,sessionUUID:x})}}),Object(X.jsx)(be.a,{exact:!0,path:w+"/lobby/".concat(j),render:function(){return Object(X.jsx)(Xe,{getUsersFromStore:y})}}),Object(X.jsx)(be.a,{path:"*",render:function(){return Object(X.jsx)("div",{children:" 404 Page not found!"})}})]})]})})},Ze=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,289)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),o(e),a(e)}))};a.a.render(Object(X.jsx)(r.a.StrictMode,{children:Object(X.jsx)(Ge.a,{children:Object(X.jsx)(p.a,{store:me,children:Object(X.jsx)(Ke,{})})})}),document.getElementById("root")),Ze()}},[[197,1,2]]]);
//# sourceMappingURL=main.d5dbfed6.chunk.js.map