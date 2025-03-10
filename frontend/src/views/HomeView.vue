<template>
  <div>
    <div class="header-container">
      <div class="search-bar-container">
        <input v-model="searchQuery" type="text" placeholder="Search..." class="search-input" />
      </div>
      <button @click="isModalOpen = true" class="add-button">Add Event</button>
      <button @click="isFilterSidebarOpen = !isFilterSidebarOpen" class="filter-button">
        Filter
      </button>
    </div>

    <events-list />

    <!-- Filter Sidebar -->
    <events-filter
      :is-filter-sidebar-open="isFilterSidebarOpen"
      @on-close="isFilterSidebarOpen = false"
    />

    <!-- Add event modal -->
    <add-edit-modal
      :is-modal-open="isModalOpen"
      @on-submit="addEvent"
      @on-close="isModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import AddEditModal from '@/components/AddEventModal.vue'
import EventsFilter from '@/components/EventsFilter.vue'
import EventsList from '@/components/EventsList.vue'
import { ref, watch } from 'vue'
import { useEventsStore } from '@/stores/events'
import { useDebounce } from '@/composables/useDebounce'
import { storeToRefs } from 'pinia'
import type { CreateEventFormData } from '@/types/events-types'

const eventsStore = useEventsStore()
const { searchQuery } = storeToRefs(eventsStore)

const isModalOpen = ref(false)
const isFilterSidebarOpen = ref(false)

eventsStore.fetchEvents()

const debounceSearch = useDebounce(eventsStore.fetchEvents, 1000)

const addEvent = async (data: CreateEventFormData) => {
  await eventsStore.createNewEvent(data)
  isModalOpen.value = false
}

watch(searchQuery, debounceSearch)
</script>

<style scoped>
/* Container for search bar and Add button */
.header-container {
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

/* Search Bar Styling */
.search-bar-container {
  flex: 1;
}

.search-input {
  width: 100%;
  height: 40px;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.add-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #0056b3;
}

/* Filter Button */
.filter-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter-button:hover {
  background-color: #218838;
}
</style>
