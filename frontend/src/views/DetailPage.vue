<template>
  <div class="event-detail-container">
    <div class="event-card">
      <img :src="event.image" :alt="`${event.name} Image`" class="event-image" />
      <div class="event-info">
        <div class="event-header">
          <h1 class="event-title">{{ event.name }}</h1>
          <button @click="isModalOpen = true" class="edit-button">✏️</button>
        </div>
        <p class="event-category">Category: {{ event.category }}</p>
        <p class="event-description">{{ event.description }}</p>
        <p class="event-date">Date: {{ formattedDate }}</p>
        <p class="event-timing">Timing: {{ event.timing }}</p>
        <p class="event-location">Location: {{ event.location }}</p>
        <p class="event-max">Max Attendees: {{ event.max_allowed }}</p>
      </div>
    </div>

    <add-event-modal
      :is-modal-open="isModalOpen"
      :prefill-data="event"
      @on-submit="editEvent"
      @on-close="isModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import AddEventModal from '@/components/AddEventModal.vue'
import { getEventById, updateEvent } from '@/services/events.service'
import type { CreateEventFormData, RawEvent } from '@/types/events-types'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isModalOpen = ref(false)
const event = ref({} as RawEvent)

const fetchEvent = async () => {
  event.value = await getEventById(route.params.id as string)
}

const editEvent = async (data: CreateEventFormData) => {
  await updateEvent(event.value._id, data)
  fetchEvent()
  isModalOpen.value = false
}

const formattedDate = computed(() => {
  const date = new Date(event.value.date)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

fetchEvent()
</script>

<style scoped>
.event-detail-container {
  padding: 20px;
}

.event-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  /* max-width: 90%; */
  /* text-align: center; */
  position: relative;
}

.event-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.event-info {
  margin-top: 15px;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-title {
  font-size: 24px;
  font-weight: bold;
}

.event-category,
.event-date,
.event-timing,
.event-location,
.event-max {
  font-size: 14px;
  color: #555;
  margin: 5px 0;
}

.event-description {
  font-size: 16px;
  margin: 10px 0;
  color: #333;
}

.edit-button {
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;
  background-color: transparent;
}
</style>
