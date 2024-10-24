import { axiosInstance } from '@/configs/axios.config.js'

export const apiGetProfile = async () => await axiosInstance.get(`/profile`)
export const apiUpdateProfile = async (formData) => {
  await axiosInstance.put(`/profile`, formData)
}

export const apiGetMyIdeas = async (url) => await axiosInstance.get(`/ideas/own${url}`)
export const apiGetMyPublishIdeas = async (url) => await axiosInstance.get(`/ideas/own/publish${url}`)
export const apiGetMyHideIdeas = async (url) => await axiosInstance.get(`/ideas/own/hide${url}`)
export const apiGetMyDraftIdeas = async (url) => await axiosInstance.get(`/ideas/own/draft${url}`)
export const apiGetMyDraftIdeaById = async (id) => await axiosInstance.get(`/ideas/own/draft/${id}`)
export const apiGetMyHideIdeaById = async (id) => await axiosInstance.get(`/ideas/own/hide/${id}`)

export const apiGetMyHistoryActivities = async () => await axiosInstance.get(`/hitories`)
export const apiUpdatePassword = async (body) => await axiosInstance.post(`/update-password`, body)
export const apiForgotPassword = async (body) => await axiosInstance.post(`/forgot-password`, body)
export const apiCheckResetPassword = async () => await axiosInstance.get(`/reset-password`)
export const apiResetPassword = async (body) => await axiosInstance.post(`/reset-password`, body)
