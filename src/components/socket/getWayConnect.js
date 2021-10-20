import { setLinkForSS, setSessionUserUUID } from '../redux/appReducer';
import store from '../redux/store'
import {
	getWayWebSocket,
	ToGetway_FromUnknown_AuthSocket,
	FromGetway_AuthSocket_Response,
	ToGetway_FromPlayer_GetSoundServer,
	FromGetway_FromPlayer_GetSoundServerResponse
} from "./constants.js";


export function getWayConnection(lobbyUUID = '', connectionType = 1) {

	const newWS = new WebSocket(getWayWebSocket);

	connect();

	function connect() {
		newWS.onopen = () => {
			console.log('GetWay Socket connected');
			newWS.send(JSON.stringify({ method: ToGetway_FromUnknown_AuthSocket, token: "0e1e703b-059b-4d3d-b275-3fc36ea4e8c4", type: connectionType }))
		}
		newWS.onmessage = (data) => {
			let dataFromGetWay = JSON.parse(data.data);
			console.log(dataFromGetWay);

			if (dataFromGetWay.method != undefined) {
				switch (dataFromGetWay.method) {

					case FromGetway_AuthSocket_Response:
						console.log(dataFromGetWay.user);
						store.dispatch(setSessionUserUUID(dataFromGetWay.user.session_uuid, dataFromGetWay.user.user_uuid))
						newWS.send(JSON.stringify({ method: ToGetway_FromPlayer_GetSoundServer, lobby_uuid: lobbyUUID }))
						break;

					case FromGetway_FromPlayer_GetSoundServerResponse:
						let link = `wss://${dataFromGetWay.ip}:${dataFromGetWay.port}`;
						store.dispatch(setLinkForSS(link))

						break;
					default:
						console.log('Unexpected method');
				}
			}
		}

		newWS.onclose = () => {
			console.log('GetWay websocket closed. trying to reconnect...');
			setTimeout(() => {
				connect()
			}, 1000);
		}
	}
}
