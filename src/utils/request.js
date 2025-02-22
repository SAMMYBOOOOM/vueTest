import axios from "axios"
import router from "@/router";

const request = axios.create({
    baseURL: "http://localhost:9090",   // backend address
    timeout: 30000
})

request.interceptors.request.use(config => {
    config.headers['Constent-Type'] = 'application/json;charset=utf-8'
    let user = JSON.parse(localStorage.getItem("honey-user") || '{}')
    config.headers['token'] = user.token   // setting request header

    return config
}, error => {
    console.error('request error' + error)  // for debug
    return Promise.reject(error)
})

// response interceptors
// can be used to add a global response interceptor at the end of api requests
request.interceptors.response.use(response => {
    let res = response.data
    if (typeof res === 'string') {  // if it is a string make it an object
        res = res ? JSON.parse(res) : res
    }
    if(res.code === '401'){
        router.push('/login')
    }
    return res
}, error => {
    console.error('request error' + error)  // for debug
    return Promise.reject(error)
})


export default request