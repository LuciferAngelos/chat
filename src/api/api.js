import * as Axios from 'axios';

//axios base setup
let instance = Axios.create({
	baseURL: 'https://getway.dev.viexpo.ru/api/',
	// headers: {
	// 	'x-viexpo-tenant': '0',
	// }
});

export const authAPI = {
	me() {
		return instance.get('account/fake/get')
	}
}