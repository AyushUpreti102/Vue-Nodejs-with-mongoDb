import { useAxios } from '@/composables/useAxios'

export const createEvent = async (payload: any) => {
  const { data } = await useAxios({
    url: '/events/add',
    method: 'POST',
    data: payload
  })

  return data
}
