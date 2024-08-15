import { axiosInstance } from '@/configs/axios.config.js'

export const apiGetProfile = async () => await axiosInstance.get(`/profile`)
export const apiUpdateProfile = async () => await axiosInstance.put(`/profile`)

export const apiGetMyIdeas = async () => await axiosInstance.get(`/ideas/own`)
export const apiGetMyPublishIdeas = async () => await axiosInstance.get(`/ideas/own/publish`)
export const apiGetMyHideIdeas = async () => await axiosInstance.get(`/ideas/own/hide`)
export const apiGetMyDraftIdeas = async () => await axiosInstance.get(`/ideas/own/draft`)
export const apiGetMyDraftIdeaById = async (id) => await axiosInstance.get(`/ideas/own/draft/${id}`)
export const apiGetMyHideIdeaById = async (id) => await axiosInstance.get(`/ideas/own/hide/${id}`)

export const apiGetMyHistoryActivities = async () => await axiosInstance.get(`/hitories`)

