import axios from 'axios';
import { getEnv } from '../helpers';

const { VITE_API_URL } = getEnv()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

// Add a request interceptor
calendarApi.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        config.headers = {
            ...config.headers,
            'x-token': localStorage.getItem('token'),
        }

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default calendarApi;