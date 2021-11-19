import React from 'react';
import Peer from 'peerjs';
import { mainServerRoot, pathForPeer } from '../../socket/constants';


export const initializePeerConnection = (userUUID, sessionToken) => {
	const peerID = `${userUUID}_${sessionToken.split('-')[0]}`;
	return new Peer(peerID, {
		host: mainServerRoot,
		debug: 1,
		port: 443,
		path: pathForPeer,
		secure: true
	});
}