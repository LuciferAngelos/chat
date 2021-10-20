import { setLinkForSS } from '../redux/appReducer';
import store from '../redux/store'
import {
	getWayWebSocket,
	ToGetway_FromUnknown_AuthSocket,
	FromGetway_AuthSocket_Response,
	ToGetway_FromPlayer_GetSoundServer,
	FromGetway_FromPlayer_GetSoundServerResponse
} from "./constants.js";

// lobbyUUID = "123456789012345678901234567890123456"
export function getWayConnection(sessionUUID, lobbyUUID, connectionType = 1) {

	const newWS = new WebSocket(getWayWebSocket);

	connect();

	function connect() {
		newWS.onopen = () => {
			console.log('GetWay Socket connected');
			newWS.send(JSON.stringify({ method: ToGetway_FromUnknown_AuthSocket, token: sessionUUID, type: connectionType }))
		}
		newWS.onmessage = (data) => {
			let dataFromGetWay = JSON.parse(data.data);
			console.log(dataFromGetWay);

			if (dataFromGetWay.method != undefined) {
				switch (dataFromGetWay.method) {

					case FromGetway_AuthSocket_Response:
						console.log(dataFromGetWay.user);
						console.log();
						newWS.send(JSON.stringify({ method: ToGetway_FromPlayer_GetSoundServer, lobby_uuid: lobbyUUID }));
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
