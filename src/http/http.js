import axios from "axios"
import ls from "@/utils/localStorage";

const instance = axios.create({
  baseURL: 'http://blog.site/admin',
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});


instance.interceptors.request.use(function (config) {

  const token = ls.getItem('token')

  token && (config.headers.Authorization = 'Bearer ' + token)

  return config;
}, function (error) {
  return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
  return {
    status: response.data.status,
    data: response.data.data,
    meta: response.data.meta || {}
  };
}, function (error) {

  // http 300 400 500  exception
  const response_data = error.response.data
  let response_status = error.response.status
  if (response_status < 500) {
    return response_data
  }
  handleError(response_status, response_data)
  return Promise.reject(error);
});


// 500 错误
function handleError(response_status, response_data) {
  console.log(response_status, response_data)
  // // token過期
  // if (response_status == 422) {
  //   store.dispatch('update_token', null)
  //   store.dispatch('update_user', {})
  // }
}

export default instance 