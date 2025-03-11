<template>
  <div class="pagination">
    <button v-if="modelValue > 1" @click="changePage(modelValue - 1)" class="pagination-button">
      Previous
    </button>

    <button
      v-for="page in displayedPages"
      :key="page"
      :class="['pagination-button', { active: page === modelValue }]"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button
      v-if="modelValue < totalPages"
      @click="changePage(modelValue + 1)"
      class="pagination-button"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props for total pages and current page
const props = defineProps<{
  totalPages: number
  modelValue: number
}>()

// Emit for updating currentPage
const emit = defineEmits(['update:modelValue'])

// Method to change the current page
const changePage = (page: number | string) => {
  if (typeof page === 'number' && page > 0 && page <= props.totalPages) {
    emit('update:modelValue', page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const paginate = (current_page: number, last_page: number) => {
  let pages = []
  for (let i = 1; i <= last_page; i++) {
    let offset = 1
    if (
      i === 1 ||
      (current_page - offset <= i && current_page + offset >= i) ||
      i === current_page ||
      i === last_page
    ) {
      pages.push(i)
    } else if (i === current_page - (offset + 1) || i === current_page + (offset + 1)) {
      pages.push('...')
    }
  }
  return pages
}

// Computed property to get the displayed pages
const displayedPages = computed(() => paginate(props.modelValue, props.totalPages))
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination-button {
  padding: 8px 12px;
  cursor: pointer;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.pagination-button.active {
  background-color: #007bff;
  color: white;
}

.pagination-button:hover {
  background-color: #ddd;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
