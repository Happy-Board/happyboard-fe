import { axiosInstance } from '@/configs/axios.config.js'

export const apiGetGroupByUser = async () => await axiosInstance.get('/groups/byUser')

export const apiCreateGroup = async (formData) => await axiosInstance.post('/groups', formData)

export const apiGetGroupById = async (id) => await axiosInstance.get(`/groups/${id}`)

