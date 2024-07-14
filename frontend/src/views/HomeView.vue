<template>
  <main>
    {{ result }}
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { fetchTest } from '@/services/testServices';

const result = ref({});

const fetchData = async () => {
  result.value = await fetchTest();
}

fetchData();
</script>
