import { useAxios } from '@/api/apiClient'
import type { CreateEventFormData, EventData, FilterForm, RawEvent } from '@/types/events-types'

type EventsParams = {
  skip?: number
  limit?: number
  search?: string
  date?: string
  location?: string
  category?: string
  sort?: 'asc' | 'dsc'
}

export const getEvents = async (
  skip?: number,
  limit?: number,
  search?: string,
  sort?: 'asc' | 'dsc',
  filters?: FilterForm
) => {
  const params: EventsParams = {
    skip,
    limit
  }

  const { date, category, location } = filters || {}

  if (search) {
    params.search = search
  }
  if (date) {
    params.date = date
  }
  if (location) {
    params.location = location
  }
  if (category) {
    params.category = category
  }

  params.sort = sort

  const { data } = await useAxios<EventData>({
    url: '/events',
    method: 'GET',
    params
  })

  const formatData = (event: RawEvent) => {
    delete event.__v
    const { _id, ...rest } = event
    return {
      id: _id,
      ...rest
    }
  }

  return {
    ...data,
    events: data.events.map(formatData)
  }
}

export const getEventById = async (id: string) => {
  const { data } = await useAxios<RawEvent>({
    url: `/events/${id}`,
    method: 'GET',
    params: {
      id
    }
  })

  return data
}

export const createEvent = async (payload: CreateEventFormData) => {
  const { data } = await useAxios({
    url: '/events/add',
    method: 'POST',
    data: payload
  })

  return data
}

export const updateEvent = async (id: string, payload: CreateEventFormData) => {
  const { data } = await useAxios({
    url: `/events/edit/${id}`,
    method: 'PUT',
    data: payload
  })

  return data
}
