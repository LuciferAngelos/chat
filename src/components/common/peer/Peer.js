import React from 'react';
import Peer from 'peerjs';


export const initializePeerConnection = (userUUID, linkForSS) => {
	return new Peer(userUUID, {
		host: '/',
		proxied: true,
		debug: 1,
		port: 10000,
		path: '/sound/peer',
	});
}