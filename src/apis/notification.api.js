import { axiosInstance } from '@/configs/axios.config.js'

export const apiGetNotifications = async (url) => await axiosInstance.get(`/notifications${url}`)