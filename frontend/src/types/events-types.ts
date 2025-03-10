export interface EventData {
  events: RawEvent[]
  page: number
  total: number
}

export interface RawEvent {
  _id: string
  name: string
  description: string
  date: string
  location: string
  image: string
  max_allowed: number
  timing: string
  category: string
  __v?: number
}

export interface Event {
  name: string
  description: string
  date: string
  location: string
  image: string
  max_allowed: number
  timing: string
  category: string
  id: string
}

export interface CreateEventFormData {
  name: string
  description: string
  date: string
  location: string
  image: string
  max_allowed: number | null
  timing: string
  category: string
}

export interface FilterForm {
  date: string
  location: string
  category: string
}
