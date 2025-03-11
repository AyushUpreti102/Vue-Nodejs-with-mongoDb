import { getAuthToken, signOut } from '@/services/auth.service'
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
          refreshToken: localStorage.getItem('refreshToken')
        })

        localStorage.setItem('token', data.token)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        signOut()
      }
    }

    return Promise.reject(error)
  }
)

export const useAxios = async <T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const result = await axiosInstance.request(options)
  return result
}
