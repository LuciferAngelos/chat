import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import textChatTabActiveIcon from '../../../../assets/src/media/icons/textChatTabActiveIcon.png'
import textChatTabNotActiveIcon from '../../../../assets/src/media/icons/textChatTabNotActiveIcon.png'
import voiceChatTabActiveIcon from '../../../../assets/src/media/icons/voiceChatTabActiveIcon.png'
import voiceChatTabNotActiveIcon from '../../../../assets/src/media/icons/voiceChatTabNotActiveIcon.png'
import usersTabActiveIcon from '../../../../assets/src/media/icons/usersTabActiveIcon.png'
import usersTabNotActiveIcon from '../../../../assets/src/media/icons/usersTabNotActiveIcon.png'
import { makeStyles } from '@material-ui/styles';
import { TabPanelContainer } from './tab-panel/TabPanelContainer';


function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 0 }}>
					{children}
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const chatBarHeaderArr = [
	{
		notActiveTabIcon: <img src={voiceChatTabNotActiveIcon} style={{ margin: '0 5px 0 0' }}></img>,
		activeTabIcon: <img src={voiceChatTabActiveIcon} style={{ margin: '0 5px 0 0' }}></img>,
		label: 'Голосовой чат'
	},
	{
		notActiveTabIcon: <img src={textChatTabNotActiveIcon} style={{ margin: '0 5px 0 0' }}></img>,
		activeTabIcon: <img src={textChatTabActiveIcon} style={{ margin: '0 5px 0 0' }}></img>,
		label: 'Текстовый чат'
	},
	{
		notActiveTabIcon: <img src={usersTabNotActiveIcon} style={{ margin: '0 5px 0 0' }}></img>,
		activeTabIcon: <img src={usersTabActiveIcon} style={{ margin: '0 5px 0 0' }}></img>,
		label: 'Пользователи'
	}
]

const panelTypes = [
	{
		type: 'voice'
	},
	{
		type: 'text'
	},
	{
		type: 'users'
	}
];

const useStyles = makeStyles({
	common: {
		color: '#00AFBC !important'
	},
	selected: {
		backgroundColor: '#00AFBC !important',
		color: '#ffffff !important',
	},
	root: {
		width: '435px',
		backgroundColor: '#F1F9FA',
		borderRadius: '0px 8px 0px 0px'
	}
});

export default function ChatBar() {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	const classes = useStyles();

	return (
		<Box style={{ position: 'relative', height: '100vh', borderRight: '1px solid #F1F9FA' }}>
			<AppBar position="static" classes={{
				root: classes.root
			}}>
				<Tabs
					classes={{
						root: classes.root
					}}
					TabIndicatorProps={{
						style: {
							display: 'none'
						},
					}}
					value={value}
					onChange={handleChange}
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					{
						chatBarHeaderArr.map((el, idx) =>
							<Tab
								key={idx}
								classes={{
									root: classes.common,
									selected: classes.selected
								}}
								icon={value === idx ? el.activeTabIcon : el.notActiveTabIcon}
								label={el.label}
								sx={{
									textTransform: 'none',
									fontFamily: 'Roboto',
									fontSize: '14px',
									fontStyle: 'normal',
									fontWeight: 700,
									letterSpacing: 0,
									flexDirection: 'row',
									padding: 0
								}}
								{...a11yProps(idx)}
							/>

						)
					}
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel children='div' value={value} index={0} dir={theme.direction}>
					<TabPanelContainer panelType={panelTypes[0].type} />
				</TabPanel>
				<TabPanel children='div' value={value} index={1} dir={theme.direction}>
					<TabPanelContainer panelType={panelTypes[1].type} />
				</TabPanel>
				<TabPanel children='div' value={value} index={2} dir={theme.direction}>
					<TabPanelContainer panelType={panelTypes[2].type} />
				</TabPanel>
			</SwipeableViews>
		</Box >
	);
}