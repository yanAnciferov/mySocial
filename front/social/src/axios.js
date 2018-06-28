import axios from "axios"


axios.defaults.baseURL = 'http://localhost:3001';

export function updateAxiosHeaderAuthorization(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
