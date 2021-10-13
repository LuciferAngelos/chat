import * as Axios from 'axios';

//axios base setup
let instance = Axios.create({
	baseURL: 'https://getway.dev.viexpo.ru',
	headers: {
		'x-viexpo-tenant': '0',
	}
});