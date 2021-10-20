import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const ScreenCapture = React.forwardRef((props, ref) => {
	return (

		<video ref={ref} autoPlay height="400" width='100%'></video>


	)
})