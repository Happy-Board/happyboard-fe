import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: false
})

axiosInstance.interceptors.request.use(function (config) {
  // let token
  // let userId
  // const cookie = document.cookie.split('; ')
  // cookie.forEach((element) => {
  //   const subCookie = element.split('=')
  //   if (subCookie[0] === 'access-token') token = subCookie[1]
  //   if (subCookie[0] === 'userId') userId = subCookie[1]
  // })
  config.headers.Authorization = localStorage.getItem('accessToken')
  config.headers['x-client-id'] = localStorage.getItem('uid')

  return config
})
