import axios from 'axios';
const baseURL = 'https://api.sbercloud.ru/content/v1/bootcamp/frontend';
const instance = axios.create({
	baseURL,
});
export const submitForm = async (data: any) => {
	const response = await instance.post('/', data);
	return response.data;
};
