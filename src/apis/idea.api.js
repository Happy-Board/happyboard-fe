import { axiosInstance } from '@/configs/axios.config'

export const apiGetIdeas = async (url) => await axiosInstance.get(`/ideas${url}`)

export const apiGetHotIdeas = async () => await axiosInstance.get(`/ideas/popular`)

export const apiGetDetailDraftIdeas = async (id) => await axiosInstance.get(`/ideas/draft/${id}`)

export const apiGetRecentIdeas = async () => await axiosInstance.get(`/ideas/recent`)

export const apiGetRelatedIdeas = async (ideaId) => await axiosInstance.get(`/ideas/similar?id=${ideaId}`)

export const apiGetDetailIdea = async (id) => await axiosInstance.get(`/ideas/${id}`)

export const apiVoteUpIdea = async (id) => await axiosInstance.post(`/ideas/${id}/up`)

export const apiVoteDownIdea = async (id) => await axiosInstance.post(`/ideas/${id}/down`)

export const apiCreateComment = async (id, body) =>
  await axiosInstance.post(`/ideas/${id}/comments`, body)

export const apiGetComment = async (id) => await axiosInstance.get(`/ideas/${id}/comments`)

export const apiCancelVoteIdea = async (id) => await axiosInstance.delete(`/ideas/${id}/cancel`)

export const apiCreateIdea = async (body) => await axiosInstance.post('/ideas', body)

export const apiSaveIdea = async (body) => await axiosInstance.post('/ideas/draft', body)

export const apiDeleteIdea = async (id) => await axiosInstance.delete(`/ideas/${id}`)

export const apiUpdateIdea = async (id, body) => await axiosInstance.put(`/ideas/${id}`, body)



