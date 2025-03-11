<template>
  <div class="events-list">
    <div class="event-cards-container">
      <template v-for="event in events" :key="event.id">
        <event-card :event="event" />
      </template>
    </div>
    <app-pagination
      v-model="currentPage"
      :max-displayed-pages="6"
      :total-pages="totalPages"
      @update:model-value="eventsStore.fetchEvents"
    />
  </div>
</template>

<script setup lang="ts">
import { useEventsStore } from '@/stores/events'
import EventCard from './EventCard.vue'
import AppPagination from './AppPagination.vue'
import { storeToRefs } from 'pinia'

const eventsStore = useEventsStore()
const { events, currentPage, totalPages } = storeToRefs(eventsStore)
</script>

<style scoped>
.events-list {
  padding: 20px;
}

.event-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); /* Responsive grid with min width */
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .event-cards-container {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); /* Smaller cards on mobile */
  }
}

@media (max-width: 480px) {
  .event-cards-container {
    grid-template-columns: 1fr; /* One column layout on very small screens */
  }
}
</style>
