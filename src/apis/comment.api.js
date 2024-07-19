import { axiosInstance } from '@/configs/axios.config.js'

export const apiGetComment = async (ideaId) => await axiosInstance.get(`/ideas/${ideaId}/comments`)

export const apiCreateComment = async (body, ideaId ) => await axiosInstance.post(`/ideas/${ideaId}/comments`, body)