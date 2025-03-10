<template>
  <div class="event-card">
    <img class="event-image" :src="event.image" :alt="`${event.name}-image`" />
    <div class="event-header">
      <h3 class="event-title">{{ event.name }}</h3>
      <span class="event-location">{{ event.location }}</span> <br />
      <span class="event-date">{{ formattedDate }}, {{ event.timing }}</span>
    </div>
    <p class="event-description">
      {{ event.description }}
    </p>
    <div class="event-footer">
      <button
        class="btn-view-details"
        @click="$router.push({ name: 'details-page', params: { id: event.id } })"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/types/events-types'
import { computed } from 'vue'

const props = defineProps<{
  event: Event
}>()

const formattedDate = computed(() => {
  const date = new Date(props.event.date)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<style scoped>
.event-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.event-header {
  padding: 15px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #f1f1f1;
}

.event-image {
  max-width: 100%;
  height: 300px;
  border-radius: 8px;
}

.event-title,
.event-location {
  font-size: 20px;
  margin: 0;
  color: #333;
}

.event-date {
  font-size: 14px;
  color: #007bff;
  margin-top: 8px;
}

.event-description {
  padding: 15px;
  font-size: 16px;
  color: #666;
}

.event-footer {
  padding: 15px;
  text-align: center;
}

.btn-view-details {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-view-details:hover {
  background-color: #0056b3;
}
</style>
