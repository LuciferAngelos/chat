(this["webpackJsonpvoice-chat"]=this["webpackJsonpvoice-chat"]||[]).push([[0],{136:function(e,t,n){},137:function(e,t,n){},169:function(e,t,n){},170:function(e,t,n){},175:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n.n(c),r=n(23),a=n.n(r),i=(n(136),n(11)),s=(n(137),n(97)),u=n.n(s),l=n(98),j=n(231),d=n(233),b=n(234),O=n(180),f=n(241),h=n(235),x=n(104),p=n.n(x),v=n(24),m=Object(c.createContext)(),S=n(31),y="INITIALIZED_SUCCESS",w="TOKEN_USER_UUID_GOTTEN",g="ON_LINK_GOTTEN",k="ON_DIALOG",U="GET_OUTPUT_PLAYER_VOICE_FROM_CLIENT",T="GET_OUTPUT_PLAYER_VOICE_FROM_SERVER",F={initialized:!1,linkIsFetched:!1,sessionToken:"",userUUID:"",linkForSS:"",onDialog:!1,outputPlayerVoiceFromClient:null,outputPlayerVoiceFromSS:null},_=function(e,t){return{type:w,payload:{sessionToken:e,userUUID:t}}},E=function(e){return{type:g,link:e}},I=n(2),C=Object(j.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));var A=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],c=!0===n?0:36,o="";!1===n&&(e.offset=t,o=e.readUtf8String(c)),e.offset=t+c+0;var r=e.readUInt32LE(),a={x:0,y:0,z:0};e.offset=t+c+4+0,a.x=e.readFloatLE(),e.offset=t+c+4+4,a.y=e.readFloatLE(),e.offset=t+c+4+8,a.z=e.readFloatLE(),e.offset=t+c+4+12;var i=e.readUInt8();return{uuid:o,id:r,position:a,state:i}};function N(){var e=C(),t=Object(c.useState)(!1),n=Object(i.a)(t,2),o=n[0],r=n[1],a=(Object(v.b)(),Object(c.useContext)(m)),s=a.linkForSS;a.sessionTokenForSS,a.userUUIDForSS,Object(v.c)((function(e){return e.app.onDialog})),Object(v.c)((function(e){return e.app.outputPlayerVoiceFromClient}));return Object(c.useEffect)((function(){!function e(){var t=s?new WebSocket(s):console.log("Fetching the link...");t.binaryType="arraybuffer",t.onopen=function(){u.a.get("https://getway.dev.viexpo.ru/api/account/fake/get").then((function(e){var n=e.data.response.session_uuid,c=new Uint8Array(77),o=new Uint8Array(new Uint32Array([0]).buffer),a=(new TextEncoder).encode(n),i=(new TextEncoder).encode("123456789012345678901234567890123456");c.set(o,0),c.set(a,4),c.set(new Uint8Array([0]),40),c.set(i,41),t.send(c),1===t.readyState&&r(!0)}))},t.onmessage=function(e){var n=new l.BufferStream(e.data);n.offset=0;var c=n.readInt32LE();switch(c){case 9994:n.offset=4;for(var o=n.readUInt32LE(),r=[],a=0;a<o;a++){var i=A(n,8+53*a);r.push(i)}console.log(JSON.stringify(r)),console.log("Method: FromMovement_FromPlayerScene_PlayerList, count: "+o,r),console.log("Sound Server WebSocket state is "+t.readyState);break;case 9992:var s=A(n,4);console.log("User Join: "+s.uuid);break;case 9993:n.offset=4;var u=n.readUtf8String(36);console.log("User Leave: "+u);break;case 9996:var j=A(n,4,!0);!function(e){var t=new Blob([e],{type:"audio/webm;codecs=opus"}),n=new FileReader;n.readAsDataURL(t),n.onloadend=function(){var e=n.result,t=new Audio(e);t.addEventListener("canplaythrough",(function(){t.play()}))}}(new Uint8Array(n.buffer.buffer,21)),console.log("FromSound_FromPlayerScene_PlayerVoice => ",j);break;default:console.log("Method: Unknown")}console.log("WebSocket message received:",c)},t.onclose=function(n){console.log("Sound Server Socket closed. Trying to reconnect..."),console.log("Server closed with code => ",n.code),1!==t.readyState&&r(!1),setTimeout((function(){e(),console.log(t.readyState)}),1e3)},t.onerror=function(e){console.log("This error happened => ",e),t.close()};window.sendPlayerTick=function(e){return function(e,n,c){console.log("the voice body is ",e,n,c);var o=new Uint8Array(17+c.byteLength),r=new Uint8Array(new Uint32Array([9991]).buffer);o.set(r,0),o.set(new Uint8Array(new Float32Array([e.x]).buffer),4),o.set(new Uint8Array(new Float32Array([e.y]).buffer),8),o.set(new Uint8Array(new Float32Array([e.z]).buffer),12),o.set(new Uint8Array([n]),16),o.set(c,17),1===t.readyState&&t.send(o)}({x:0,y:0,z:0},0,e)}}()}),[s]),Object(I.jsx)("div",{className:e.root,children:Object(I.jsx)(d.a,{position:"static",children:Object(I.jsxs)(b.a,{children:[Object(I.jsx)(h.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu",children:Object(I.jsx)(p.a,{})}),Object(I.jsxs)(O.a,{variant:"h6",className:e.title,children:["Connection Status:",o?" Connected!":" Disconnected!"]}),Object(I.jsx)(f.a,{color:"inherit",children:"AChat Connection"})]})})})}var D=n(106),L=n(81),P=n.n(L),R=n(108),M=n.n(R),V=n(107),z=n.n(V),B=n(246),G=n(245),J=n(244),W=n(242),X=n(69),Y=(n(169),n(243)),K=(n(95),Object(j.a)((function(e){return{icon:{height:38,width:38},reactmic:{width:"80%",height:30},flex:{flex:1}}})));function Q(e){e.pushFile,e.setCurrentAvatarId,Object(v.b)();var t=Object(c.useState)(!1),n=Object(i.a)(t,2),o=n[0],r=n[1],a=Object(c.useState)(!1),s=Object(i.a)(a,2),u=(s[0],s[1],Object(c.useState)(!0)),l=Object(i.a)(u,2),j=l[0],d=l[1],b=Object(c.useState)(!1),O=Object(i.a)(b,2),f=(O[0],O[1],Object(c.useState)(!1)),x=Object(i.a)(f,2);x[0],x[1],Object(c.useRef)(null);Object(c.useEffect)((function(){j||navigator.mediaDevices.getUserMedia({audio:!0}).then((function(e){var t=new window.MediaRecorder(e),n=[];console.log(e.getAudioTracks()),t.start(),window.str=e,t.addEventListener("dataavailable",(function(e){n.push(e.data)})),t.addEventListener("stop",(function(){if(n.length>0){var e=n[0].type;new Blob(n,{type:e}).arrayBuffer().then((function(e){var t=new Uint8Array(e);window.sendPlayerTick(t)}))}n=[],null!==window.str&&(t.start(),setTimeout((function(){"inactive"!==t.state&&t.stop()}),1e3))})),setTimeout((function(){"inactive"!==t.state&&t.stop()}),1e3)}))}),[o,j]);var p=function(){r(!0),d(!1)};var m=function(){r(!1),d(!0),window.str.getAudioTracks().forEach((function(e){e.stop()})),window.str=null},S=K();return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(W.a,{container:!0,justify:"center",children:Object(I.jsx)(W.a,{item:!0,children:!o&&j?Object(I.jsx)(h.a,{onClick:p,children:Object(I.jsx)(P.a,{className:S.icon})}):Object(I.jsx)(h.a,{onClick:m,children:Object(I.jsx)(P.a,{className:S.icon})})})}),Object(I.jsxs)(Y.a,{children:[Object(I.jsx)(J.a,{className:S.flex,children:"Open Micro"}),Object(I.jsxs)(G.a,{children:[Object(I.jsx)("div",{}),Object(I.jsx)(D.ReactMic,{record:o,className:S.reactmic,visualSetting:"frequencyBars",echoCancellation:!0,noiseSuppression:!0,onStop:function(){},onData:function(e){},strokeColor:"green",backgroundColor:"white"})]}),Object(I.jsx)(B.a,{children:Object(I.jsx)(W.a,{container:!0,children:Object(I.jsxs)(W.a,{item:!0,container:!0,justify:"center",xs:12,children:[!o&&j&&Object(I.jsx)(h.a,{onClick:p,children:Object(I.jsx)(z.a,{style:{color:X.a[500]},className:S.icon})}),o&&!j&&Object(I.jsx)(h.a,{onClick:m,children:Object(I.jsx)(M.a,{className:S.icon})})]})})})]})]})}var q=n(58),Z=n(109),H=Object(q.b)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:return Object(S.a)(Object(S.a)({},e),{},{initialized:!0});case w:return Object(S.a)(Object(S.a)({},e),t.payload);case k:return Object(S.a)(Object(S.a)({},e),{},{onDialog:!e.onDialog});case U:return Object(S.a)(Object(S.a)({},e),{},{outputPlayerVoiceFromClient:t.voice});case T:return Object(S.a)(Object(S.a)({},e),{},{outputPlayerVoiceFromSS:t.voice});case g:return Object(S.a)(Object(S.a)({},e),{},{linkIsFetched:!0,linkForSS:t.link});default:return e}}}),$=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||q.c,ee=Object(q.d)(H,$(Object(q.a)(Z.a)));window.__store__=ee;var te=ee;n.p;var ne=function(){return Object(I.jsxs)("div",{className:"lds-facebook",children:[Object(I.jsx)("div",{}),Object(I.jsx)("div",{}),Object(I.jsx)("div",{})]})},ce=function(){return Object(I.jsx)("div",{children:Object(I.jsx)("p",{children:"This is a chat room 1"})})},oe=n(12),re=n(260),ae=n(249),ie=n(253),se=n(259),ue=n(262),le=n(252),je=n(261),de=n(258),be=n(250),Oe=n(257),fe=n(256),he=n(111),xe=n.n(he),pe=["/room1","/room2","/room3","/room4"],ve=(n(170),n(53)),me=n(15),Se=function(){return Object(I.jsx)("div",{children:"This is a chat room 2"})},ye=function(){return Object(I.jsx)("div",{children:"This is a chat room 3"})},we=function(){return Object(I.jsxs)("div",{children:[Object(I.jsx)("p",{children:"This is a chat room 4 "}),Object(I.jsx)("p",{children:"\u042f \u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0430\u043b "}),Object(I.jsx)("iframe",{width:"956",height:"538",src:"https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0})]})},ge=function(){return Object(I.jsx)(W.a,{children:Object(I.jsxs)(re.a,{sx:{display:"flex"},children:[Object(I.jsx)(se.a,{}),Object(I.jsx)(ie.a,{position:"fixed",sx:{zIndex:function(e){return e.zIndex.drawer+1}},children:Object(I.jsx)(N,{})}),Object(I.jsxs)(ae.a,{variant:"permanent",sx:Object(oe.a)({width:240,flexShrink:0},"& .MuiDrawer-paper",{width:240,boxSizing:"border-box"}),children:[Object(I.jsx)(ue.a,{}),Object(I.jsxs)(re.a,{sx:{overflow:"auto"},children:[Object(I.jsx)(le.a,{children:["Room 1","Room 2","Room 3","Room 4 (Don't)"].map((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(I.jsxs)(ve.b,{to:pe[t],style:{textDecoration:"none",color:"inherit"},activeClassName:"activeLink",exact:!0,children:[console.log(pe[t]),"         ",Object(I.jsxs)(be.a,{button:!0,children:[Object(I.jsx)(Oe.a,{children:Object(I.jsx)(xe.a,{})}),Object(I.jsx)(fe.a,{primary:e})]})]},t)}))}),Object(I.jsx)(de.a,{})]}),Object(I.jsx)(Q,{})]}),Object(I.jsxs)(re.a,{component:"main",sx:{flexGrow:1,p:10},children:[Object(I.jsx)(Q,{}),Object(I.jsxs)(me.c,{children:[Object(I.jsxs)(me.a,{exact:!0,path:"/",children:[" ",Object(I.jsx)(je.a,{paragraph:!0,children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u043e\u043c\u043d\u0430\u0442\u0443 \u0434\u043b\u044f \u0447\u0430\u0442\u0430 \u0441\u043b\u0435\u0432\u0430"})]}),Object(I.jsx)(me.a,{exact:!0,path:"/room1",component:ce}),Object(I.jsx)(me.a,{exact:!0,path:"/room2",component:Se}),Object(I.jsx)(me.a,{exact:!0,path:"/room3",component:ye}),Object(I.jsx)(me.a,{exact:!0,path:"/room4",component:we}),Object(I.jsx)(me.a,{path:"*",render:function(){return Object(I.jsx)("div",{children:"There is no such chat room!"})}})]})]})]})})};var ke=function(){var e=Object(v.b)(),t=Object(c.useState)(!1),n=Object(i.a)(t,2),o=n[0],r=n[1],a=Object(c.useState)({linkForSS:"",sessionTokenForSS:"",userUUIDForSS:""}),s=Object(i.a)(a,2),u=s[0],l=s[1],j=Object(v.c)((function(e){return e.app.linkIsFetched})),d=Object(v.c)((function(e){return e.app.linkForSS})),b=Object(v.c)((function(e){return e.app.sessionToken})),O=Object(v.c)((function(e){return e.app.userUUID}));Object(c.useMemo)((function(){e(E),e(_),l({linkForSS:d,sessionTokenForSS:b,userUUIDForSS:O})}),[d,b,O]),Object(c.useCallback)((function(){}),[]),Object(c.useEffect)((function(){!function(e){var t=new WebSocket(e);!function e(){t.onopen=function(){console.log("GetWay Socket connected"),t.send(JSON.stringify({method:0,token:"0e1e703b-059b-4d3d-b275-3fc36ea4e8c4",type:1}))},t.onmessage=function(e){var n=JSON.parse(e.data);if(console.log(n),void 0!=n.method)switch(n.method){case 1:console.log(n.user.session_uuid,n.user.user_uuid),te.dispatch(_(n.user.session_uuid,n.user.user_uuid)),t.send(JSON.stringify({method:7,company_uuid:"1"}));break;case 8:var c="wss://".concat(n.ip,":").concat(n.port);te.dispatch(E(c));break;default:console.log("Unexpected method")}},t.onclose=function(){console.log("Sound Server Socket closed. trying to reconnect..."),setTimeout((function(){e()}),1e3)}}()}("wss://getway.dev.viexpo.ru:8010")}),[]),Object(c.useMemo)((function(){r(j)}),[j]),Object(c.useEffect)((function(){}),[]);var f=Object(c.useState)(0),h=Object(i.a)(f,2);return h[0],h[1],Object(I.jsx)(m.Provider,{value:u,children:Object(I.jsx)("div",{className:"home",style:{textAlign:"center"},children:o?Object(I.jsx)("div",{children:Object(I.jsx)(ge,{})}):Object(I.jsx)(ne,{})})})},Ue=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,264)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),o(e),r(e),a(e)}))};a.a.render(Object(I.jsx)(o.a.StrictMode,{children:Object(I.jsx)(ve.a,{children:Object(I.jsx)(v.a,{store:te,children:Object(I.jsx)(ke,{})})})}),document.getElementById("root")),Ue()},95:function(e,t){}},[[175,1,2]]]);
//# sourceMappingURL=main.4d8de7f2.chunk.js.map