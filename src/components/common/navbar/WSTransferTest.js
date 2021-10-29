import React, { useContext } from 'react'
import { WSSSContext } from '../../../utils/Context';

export const WSTransferTest = ({ webSocket }) => {
	console.log('this is the socket => ', webSocket);
	return (
		<div>
			Закрыть сокет

			<button onClick={() => webSocket.current.close()}>close</button>
		</div >
	)
}