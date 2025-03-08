<template>
  <div v-if="isModalOpen" class="modal-overlay" @click.self="emit('onClose')">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Create Event</h2>
        <button @click="closeModal" class="close-modal">X</button>
      </div>
      <div class="event-form">
        <h2 class="form-title">Create Event</h2>

        <form @submit.prevent="emit('onSubmit', formData)" class="form-container">
          <!-- Name Field -->
          <div class="form-group">
            <label for="name" class="form-label">Event Name</label>
            <input v-model="formData.name" type="text" id="name" class="form-input" required />
          </div>

          <!-- Description Field -->
          <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea
              v-model="formData.description"
              id="description"
              class="form-input"
              required
            ></textarea>
          </div>

          <!-- Date Field -->
          <div class="form-group">
            <label for="date" class="form-label">Event Date</label>
            <input v-model="formData.date" type="date" id="date" class="form-input" required />
          </div>

          <!-- Location Field -->
          <div class="form-group">
            <label for="location" class="form-label">Location</label>
            <input
              v-model="formData.location"
              type="text"
              id="location"
              class="form-input"
              required
            />
          </div>

          <!-- Image URL Field -->
          <div class="form-group">
            <label for="image" class="form-label">Image URL</label>
            <input v-model="formData.image" type="url" id="image" class="form-input" required />
          </div>

          <!-- Max Allowed Field -->
          <div class="form-group">
            <label for="max_allowed" class="form-label">Max Attendees</label>
            <input
              v-model="formData.max_allowed"
              type="number"
              id="max_allowed"
              class="form-input"
              required
            />
          </div>

          <!-- Timing Field -->
          <div class="form-group">
            <label for="timing" class="form-label">Event Timing</label>
            <input v-model="formData.timing" type="text" id="timing" class="form-input" required />
          </div>

          <!-- Category Field -->
          <div class="form-group">
            <label for="category" class="form-label">Category</label>
            <select v-model="formData.category" id="category" class="form-input" required>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="webinar">Webinar</option>
              <option value="meetup">Meetup</option>
            </select>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isModalOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'onSubmit', value: any): void
  (e: 'onClose'): void
}>()

const formData = ref({
  name: '',
  description: '',
  date: '',
  location: '',
  image: '',
  max_allowed: null,
  timing: '',
  category: 'conference'
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 700px;
  max-width: 90%;
  transform: scale(0);
  animation: slideIn 0.3s forwards ease-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-modal {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.event-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-input {
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
}

.submit-btn {
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
