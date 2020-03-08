import axios from 'axios';

const api = axios.create({ 
    baseURL: 'https://store-backend-node.herokuapp.com'
});

export default api;