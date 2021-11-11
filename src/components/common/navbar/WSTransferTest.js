import React, { useContext } from 'react'
import { WSSSContext } from '../../../utils/Context';

export const WSTransferTest = ({ webSocket }) => {
	return (
		<div>
			Закрыть сокет

			<button onClick={() => webSocket.current.close()}>close</button>
		</div >
	)
}