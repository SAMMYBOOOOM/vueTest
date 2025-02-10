import axios from "axios"

const request = axios.create({
    baseURL: "http://localhost:9090",   // backend address
    timeout: 30000
})

request.interceptors.request.use(config => {
    config.headers['Constent-Type'] = 'application/json;charset=utf-8'

    // config.headers['token'] = 'token'   // token

    return config
}, error => {
    console.error('request error' + error)  // for debug
    return Promise.reject(error)
})

request.interceptors.response.use(response => {
    let res = response.data
    if (typeof res === 'string') {  // if it is a string make it an object
        res = res ? JSON.parse(res) : res
    }
    return res
}, error => {
    console.error('request error' + error)  // for debug
    return Promise.reject(error)
})


export default request