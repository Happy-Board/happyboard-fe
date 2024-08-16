import axios from 'axios'


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL ? import.meta.env.VITE_SERVER_URL : "https://duymt.io.vn/api/v1",
  withCredentials: true
})

axiosInstance.interceptors.request.use(function (config) {
  let token
  let userId
  const cookie = document.cookie.split('; ')
  if(cookie[0] !== ''){
    cookie.forEach((element) => {
    const subCookie = element.split('=')
    if (subCookie[0] === 'access-token') token = subCookie[1]
    if (subCookie[0] === 'userId') userId = subCookie[1]
  })
  }else{
    token = localStorage.getItem('accessToken')
    userId = localStorage.getItem('uid')
  }
  
  config.headers.Authorization = token
  config.headers['x-client-id'] = userId
  config.headers['device-token'] = localStorage.getItem('device-token')

  return config
})
