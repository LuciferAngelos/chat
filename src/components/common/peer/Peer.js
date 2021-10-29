import React from 'react';
import Peer from 'peerjs';


export const initializePeerConnection = (userUUID, linkForSS) => {
	return new Peer(userUUID, {
		// host: '/',
		// debug: 1,
		// port: 10010,
		// path: '/peer',
		secure: true
	});
}