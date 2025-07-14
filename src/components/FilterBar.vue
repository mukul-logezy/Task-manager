<template>
  <v-row class="mb-2">
    <v-col cols="4">
      <v-select v-model="filters.status" :items="['All', 'To Do', 'In Progress', 'Completed']" label="Status"
        @update:model-value="emitFilter" />
    </v-col>
    <v-col cols="4">
      <v-select v-model="filters.priority" :items="['All', 'Low', 'Medium', 'High']" label="Priority"
        @update:model-value="emitFilter" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const emit = defineEmits(['filter'])

const filters = reactive({ status: '', priority: '' })

function emitFilter() {
  emit('filter', { status: filters.status === 'All' ? '' : filters.status, priority: filters.priority === 'All' ? '' : filters.priority })
}
</script>
