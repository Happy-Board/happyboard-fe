import { axiosInstance } from '@/configs/axios.config.js'

export const apiGetCategory = async () => await axiosInstance.get('/categories')

export const apiCreateCategory = async (body) => await axiosInstance.post('/categories/create', body)
