import { axiosInstance } from '@/configs/axios.config'

export const apiGetIdeas = async (url) => await axiosInstance.get(`/ideas${url}`)

export const apiCreateIdea = async (body) => await axiosInstance.post('/ideas/create', body)

export const apiSaveIdea = async (body) => await axiosInstance.post('/ideas/save', body)
