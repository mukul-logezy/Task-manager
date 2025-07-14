<template>
  <v-container fluid>
    <v-row class="align-center mb-2">
      <v-col cols="12" md="6">
        <FilterBar @filter="onFilter" />
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-end">
        <v-btn color="primary" @click="openForm(null)" class="w-100 w-md-auto">Add Task</v-btn>
      </v-col>
    </v-row>

    <TaskList :tasks="filteredTasks" @edit="openForm" @delete="deleteTask" />
    <TaskFormModal v-model="isFormOpen" :task="selectedTask" @save="saveTask" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '../stores/taskstore'
import TaskList from '../components/TaskList.vue'
import TaskFormModal from '../components/TaskFormModel.vue'
import FilterBar from '../components/FilterBar.vue'

const taskStore = useTaskStore()
const isFormOpen = ref(false)
const selectedTask = ref(null)
const filters = ref({ status: '', priority: '' })

const filteredTasks = computed(() => taskStore.getFilteredTasks(filters.value))

function openForm(task: any) {
  selectedTask.value = task
  isFormOpen.value = true
}

function saveTask(task: any) {
  if (task.id) taskStore.updateTask(task)
  else taskStore.addTask(task)
  isFormOpen.value = false
}

function deleteTask(id: number) {
  taskStore.deleteTask(id)
}

function onFilter(newFilters: any) {
  console.log(newFilters);
  filters.value = newFilters
}

onMounted(() => taskStore.loadTasks())
</script>
