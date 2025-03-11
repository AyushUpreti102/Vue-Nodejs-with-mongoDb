<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="tab-container">
        <button class="tab-button" :class="{ active: isLogin }" @click="isLogin = true">
          Login
        </button>
        <button class="tab-button" :class="{ active: !isLogin }" @click="isLogin = false">
          Register
        </button>
      </div>
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <auth-form :is-login="isLogin" @on-submit="handleAuth" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue'
import { processLoginToken, signIn, signUp } from '@/services/auth.service'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLogin = ref(true)
const errorMessage = ref<string | null>(null)

const handleAuth = async (data: { email: string; password: string; name?: string }) => {
  try {
    errorMessage.value = null
    if (isLogin.value) {
      const result = await signIn(data)
      processLoginToken(result.token, result.refreshToken)
      router.push({ name: 'home' })
    } else {
      await signUp({ ...data, name: data.name || '' })
    }
  } catch (error) {
    errorMessage.value = (error as any).response.data.msg
  }
}
</script>

<style scoped>
/* Center the form */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

/* Card Styling */
.auth-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

/* Tabs */
.tab-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tab-button {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tab-button.active {
  background-color: #007bff;
  color: white;
}

.error-message {
  font-size: 14px;
  color: lightcoral;
}
</style>
