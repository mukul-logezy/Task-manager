<template>
  <v-data-table :headers="headers" :items="tasks" density="compact" class="mt-4" :mobile-breakpoint=600>
    <template #item.actions="{ item }">
      <v-btn size="small" icon @click="$emit('edit', item)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn size="small" icon @click="$emit('delete', item.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
defineProps<{ tasks: any[] }>()
defineEmits(['edit', 'delete'])

const headers = [
  { title: 'Title', value: 'title' },
  { title: 'Due Date', value: 'dueDate' },
  { title: 'Status', value: 'status' },
  { title: 'Priority', value: 'priority' },
  { title: 'Actions', value: 'actions', sortable: false },
]
</script>
