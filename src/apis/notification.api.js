import { axiosInstance } from '@/configs/axios.config.js'

export const apiGetNotifications = async () => await axiosInstance.get(`/notifications`)
export const apiGetUnreadNotifications = async () => await axiosInstance.get(`/notifications/unread`)
export const apiMarkNotificationReaded = async (id) => await axiosInstance.post(`/notifications/${id}`)