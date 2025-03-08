import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const useAxios = async <T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const result = await axiosInstance.request(options)
  return result
}
