import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_PORT_PROJECT_BACKEND,
});

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('@token');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});


export { api };