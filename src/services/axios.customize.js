import axios from "axios";
import NProgress from 'nprogress';


//loading bar 
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
});



const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    NProgress.start();
    //tự truyền access_token lên backend
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    // Do something before request is sent
    return config;
}, function (error) {
    NProgress.done();

    // Do something with request error
    return Promise.reject(error);
});



// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();

    if (response.data && response.data.data) return response.data;
    return response;
}, function (error) {
    NProgress.done();

    // do nếu báo lỗi phải ghi như v để chương trình kh bị dừng và trả ra về lỗi đã ghi ở backend (clip71)
    // dùg debugger để biet lấy data của error như nào
    if (error.response && error.response.data) return error.response.data
    return Promise.reject(error);
});
export default instance