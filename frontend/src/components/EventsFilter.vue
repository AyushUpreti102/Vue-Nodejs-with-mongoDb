<template>
  <transition name="filter-sidebar">
    <div v-if="isFilterSidebarOpen" class="filter-sidebar">
      <div class="filter-sidebar-content">
        <button @click="emit('on-close')" class="close-filter-btn">X</button>
        <h3>Apply Filters</h3>
        <div class="filter-field">
          <label for="date">Date</label>
          <input v-model="filters.date" type="date" id="date" />
        </div>
        <div class="filter-field">
          <label for="location">Location</label>
          <select v-model="filters.location" id="location" class="form-input" required>
            <option value="">Select</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>
        <div class="filter-field">
          <label for="category">Category</label>
          <select v-model="filters.category" id="category" class="form-input" required>
            <option value="">Select</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <button @click="eventsStore.applyFilters" class="apply-filters-btn">Apply Filters</button>
        <button @click="eventsStore.removeFilter" class="apply-filters-btn">Remove Filter</button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useEventsStore } from '@/stores/events'
import { categories, cities } from '@/services/events.constants'
import { storeToRefs } from 'pinia'

defineProps<{
  isFilterSidebarOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'on-close'): void
}>()

const eventsStore = useEventsStore()
const { filters } = storeToRefs(eventsStore)
</script>

<style scoped>
/* Filter Sidebar */
.filter-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background-color: white;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
}

.filter-sidebar-enter-from,
.filter-sidebar-leave-to {
  transform: translateX(100%); /* Start and exit off-screen */
}

.filter-sidebar-enter-active,
.filter-sidebar-leave-active {
  transition: transform 0.3s ease-in-out;
}

.filter-sidebar-enter-to,
.filter-sidebar-leave-from {
  transform: translateX(0); /* Fully visible */
}

.filter-sidebar-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.close-filter-btn {
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
  width: fit-content;
  align-self: flex-end;
}

.filter-field {
  margin-bottom: 10px;
}

.filter-field label {
  font-size: 14px;
  margin-bottom: 5px;
}

.filter-field input,
select {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.apply-filters-btn {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.apply-filters-btn:hover {
  background-color: #0056b3;
}
</style>
