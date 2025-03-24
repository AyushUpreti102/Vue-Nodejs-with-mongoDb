import { useAxios } from '@/api/apiClient'
import { jwtDecode } from 'jwt-decode' // Import jwt-decode

type Params = { email: string; password: string; name: string }

export const signIn = async (payload: Omit<Params, 'name'>) => {
  const { data } = await useAxios<{ token: string; refreshToken: string }>({
    url: '/auth/login',
    method: 'POST',
    data: payload
  })

  return data
}

export const signUp = async (payload: Params) => {
  const { data } = await useAxios({
    url: '/auth/register',
    method: 'POST',
    data: payload
  })

  return data
}

export const processLoginToken = (token: string, refreshToken: string) => {
  localStorage.setItem('token', token)
  localStorage.setItem('refreshToken', refreshToken)
}

export const getAuthToken = () => {
  return localStorage.getItem('token')
}

export const getDecodedUserInfo = () => {
  const token = getAuthToken()
  if (token) {
    try {
      const decoded: any = jwtDecode(token)
      return decoded || {}
    } catch (error) {
      console.error('Invalid token', error)
      return null
    }
  }
}

export const signOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  window.location.href = '/auth'
}
