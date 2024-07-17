import { axiosInstance } from '@/configs/axios.config.js'

export const apiGetComment = async (ideaId) => await axiosInstance.get(`/idea/${ideaId}/comment`)

export const apiCreateComment = async (body, ideaId ) => await axiosInstance.post(`/idea/${ideaId}/comment`, body)