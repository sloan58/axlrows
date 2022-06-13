import axios from 'axios'
import config from './config.json'

const axiosClient = axios.create({
    baseURL: config.api.base_url,
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
    // if (error.code === "ECONNABORTED" ) {
    //     console.log('ECONNABORTED')
    // } else {
    //     if(error.response.status === 401) {
    //         console.log(error.response.status)
    //         window.location.href = `/login`;
    //     }
    // }

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
