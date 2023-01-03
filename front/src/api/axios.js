import axios from 'axios';

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
    // baseURL: 'https://ucabrides-api-sjd77.ondigitalocean.app/api'
});
