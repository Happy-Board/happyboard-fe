import { axiosInstance } from '@/configs/axios.config.js'

export const apiGetNotifications = async (url) => await axiosInstance.get(`/notifications${url}`)
export const apiMarkNotificationReaded = async (id) => await axiosInstance.post(`/notifications/${id}`)