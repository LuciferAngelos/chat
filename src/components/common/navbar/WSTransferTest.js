import react from 'react'

export const WSTransferTest = ({ socket }) => {
	console.log('this is the socket => ', socket);

	return (
		<div>
			sdfsdf
			<button onClick={() => socket.close()}>close</button>
		</div>
	)
}