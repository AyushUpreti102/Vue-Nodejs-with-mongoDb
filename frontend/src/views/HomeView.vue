<template>
  <div>
    <div class="header-container">
      <div class="search-bar-container">
        <input v-model="searchQuery" type="text" placeholder="Search..." class="search-input" />
      </div>
      <button @click="isModalOpen = true" class="add-button">Add Event</button>
    </div>

    <add-edit-modal
      :is-modal-open="isModalOpen"
      @on-submit="addEvent"
      @on-close="isModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import AddEditModal from '@/components/AddEventModal.vue'
import { ref } from 'vue'
import { createEvent } from '@/services/events.service'

const isModalOpen = ref(false)
const searchQuery = ref('')

const addEvent = async (data: any) => {
  await createEvent(data)
  isModalOpen.value = false
}
</script>

<style scoped>
/* Container for search bar and Add button */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
}

/* Search Bar Styling */
.search-bar-container {
  flex: 1;
}

.search-input {
  width: 100%;
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
</style>
