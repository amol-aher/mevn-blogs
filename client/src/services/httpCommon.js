import axios from 'axios';

export const HTTP = axios.create({
	baseURL: 'http://localhost:8081',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('jwt')
	}
})