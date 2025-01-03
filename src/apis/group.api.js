import { axiosInstance } from '@/configs/axios.config.js'

export const apiGetGroupByUser = async () => await axiosInstance.get('/groups/byUser')

export const apiCreateGroup = async (formData) => await axiosInstance.post('/groups', formData)

export const apiGetGroupById = async (id) => await axiosInstance.get(`/groups/${id}`)

export const apiUploadAvatarGroup = async (groupId, formData) =>
  await axiosInstance.put(`/groups/${groupId}/avatar`, formData)

export const apiUploadBackgroundGroup = async (groupId, formData) =>
  await axiosInstance.put(`/groups/${groupId}/background`, formData)
