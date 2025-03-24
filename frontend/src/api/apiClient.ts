import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from './httpClient'

export const useAxios = async <T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const result = await axios.request(options)
  return result
}
