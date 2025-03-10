import { createEvent, getEvents } from '@/services/events.service'
import type { CreateEventFormData, Event, FilterForm } from '@/types/events-types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useEventsStore = defineStore('events', () => {
  const events = ref<Event[]>([])
  const currentPage = ref(1)
  const searchQuery = ref('')
  const filters = ref<FilterForm>({
    date: '',
    location: '',
    category: ''
  })
  const totalResultPerPage = ref(10)
  const totalResults = ref(0)
  const totalPages = computed(() => Math.ceil(totalResults.value / totalResultPerPage.value))

  const fetchEvents = async () => {
    const data = await getEvents(
      (currentPage.value - 1) * totalResultPerPage.value,
      totalResultPerPage.value,
      searchQuery.value,
      filters.value
    )
    events.value = data.events
    totalResults.value = data.total
  }

  const createNewEvent = async (data: CreateEventFormData) => {
    await createEvent(data)
    fetchEvents()
  }

  const applyFilters = async () => {
    currentPage.value = 1
    fetchEvents()
  }

  const removeFilter = () => {
    filters.value = {
      category: '',
      date: '',
      location: ''
    }
    currentPage.value = 1
    fetchEvents()
  }

  return {
    events,
    currentPage,
    searchQuery,
    totalPages,
    filters,
    fetchEvents,
    createNewEvent,
    applyFilters,
    removeFilter
  }
})
