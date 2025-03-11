<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-container">
      <label>Email</label>
      <input type="email" v-model="email" class="input-field" required />
    </div>

    <div class="input-container">
      <label>Password</label>
      <input type="password" v-model="password" class="input-field" required />
    </div>

    <div v-if="!isLogin" class="input-container">
      <label>Name</label>
      <input type="text" v-model="name" class="input-field" required />
    </div>

    <button type="submit" class="submit-button">
      {{ isLogin ? 'Login' : 'Register' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isLogin: boolean
}>()

const emit = defineEmits<{
  (e: 'on-submit', value: { email: string; password: string; name?: string }): void
}>()

const email = ref('')
const password = ref('')
const name = ref('')

const handleSubmit = () => {
  if (props.isLogin) {
    emit('on-submit', {
      email: email.value,
      password: password.value
    })
  } else {
    emit('on-submit', {
      email: email.value,
      password: password.value,
      name: name.value
    })
  }
}
</script>

<style scoped>
/* Form Styling */
.input-container {
  text-align: left;
  margin-bottom: 15px;
}

.input-container label {
  font-size: 14px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  height: 40px;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* Button Styling */
.submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
