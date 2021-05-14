import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://axios2-b928a.firebaseio.com/'
});

export default instance;