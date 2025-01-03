import { axiosInstance } from '@/configs/axios.config.js'

export const apiGetOptionByPollId = async (id) => await axiosInstance.get(`/polls/options/${id}`)

export const apiCreatePollResponse = async (body) => await axiosInstance.get(`/polls/votes`, body)


// export const apiCreateCategory = async (body) => await axiosInstance.post('/categories/create', body)
