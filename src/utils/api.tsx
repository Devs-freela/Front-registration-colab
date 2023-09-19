import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_PORT_PROJECT_BACKEND,
    //headers: {
    //    'Content-Type': 'application/json', // Cabeçalhos personalizados, se necessário
    //    Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Exemplo de autenticação com token
    //},
});