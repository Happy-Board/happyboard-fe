import { axiosInstance } from '@/configs/axios.config'

export const apiGetIdeas = async (url) => await axiosInstance.get(`/ideas${url}`)

export const apiGetDetailIdea = async (id) => await axiosInstance.get(`/ideas/${id}`)

export const apiVoteUpIdea = async (id) => await axiosInstance.post(`/ideas/${id}/up`)

export const apiVoteDownIdea = async (id) => await axiosInstance.post(`/ideas/${id}/down`)

export const apiCreateComment = async (id, body) =>
  await axiosInstance.post(`/ideas/${id}/comments`, body)

export const apiGetComment = async (id) => await axiosInstance.get(`/ideas/${id}/comments`)

export const apiCancelVoteIdea = async (id) => await axiosInstance.delete(`/ideas/${id}/cancel`)

export const apiCreateIdea = async (body) => await axiosInstance.post('/ideas', body)

export const apiSaveIdea = async (body) => await axiosInstance.post('/ideas/save', body)
