import axios from 'axios';

export default axios.create({
    baseURL: 'https://api-ucabrides.herokuapp.com/api'
});