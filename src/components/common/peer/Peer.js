import React from 'react';
import Peer from 'peerjs';
import { mainServerRoot, pathForPeer } from '../../socket/constants';


export const initializePeerConnection = (userUUID) => {
	return new Peer(userUUID, {
		host: mainServerRoot,
		debug: 1,
		port: 443,
		path: pathForPeer,
		secure: true
	});
}