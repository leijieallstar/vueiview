import axios from 'axios'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(!res.data.success){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default {

  findLoginlogInit(params) {
        return fetch('/api/uums/loginlog/findLoginlog', params)
    },

}
