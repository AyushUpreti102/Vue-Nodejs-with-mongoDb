<template>
  <nav class="navbar">
    <div class="navbar-content">
      <span class="welcome-text">Welcome, {{ userName }}</span>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { getDecodedUserInfo, signOut } from '@/services/auth.service'
import { onMounted, ref } from 'vue'

const userName = ref('')

onMounted(() => {
  const userInfo = getDecodedUserInfo()
  userName.value = userInfo.user.name
})

const logout = () => {
  signOut()
}
</script>

<style scoped>
.navbar {
  background-color: #007bff; /* Blue theme */
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.welcome-text {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.logout-button {
  background-color: white;
  color: #007bff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.3s;
}

.logout-button:hover {
  background-color: #0056b3;
  color: white;
}
</style>
