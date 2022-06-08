import axios from 'axios'
import config from './config.json'

const axiosClient = axios.create({
    baseURL: config.api.base_url,
    timeout: 1500,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

axiosClient.interceptors.response.use(function (response) {
    console.log(response.status)
    return response
}, function (error) {
    if(error.response.status === 401) {
        console.log(error.response.status)
        window.location.href = `${process.env.REACT_APP_BASE_HREF}/login`;
        //Add Logic to
        //1. Redirect to login page or
        //2. Request refresh token
    }
    if(error.response.status === 419) {
        console.log(error.response.status)
    }
    return Promise.reject(error);
})

export const api = {
    get,
    post,
    put,
    delete: _delete
}

function get(URL) {
    return axiosClient.get(`/${URL}`).then(response => response);
}

function post(URL, payload) {
    return axiosClient.post(`/${URL}`, payload).then(response => response);
}

function put(URL, payload) {
    return axiosClient.put(`/${URL}`, payload).then(response => response);
}

function _delete(URL) {
    return axiosClient.delete(`/${URL}`).then(response => response);
}
