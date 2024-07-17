import { axiosInstance } from '@/configs/axios.config.js'

export const apiSignIn = async (body) => await axiosInstance.post('/signin', body)

export const apiSignUp = async (body) => await axiosInstance.post('/signup', body)

export const apiLogOut = async () => await axiosInstance.post('/logout')
