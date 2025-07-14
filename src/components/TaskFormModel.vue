<template>
  <v-dialog v-model="modelValue" :fullscreen="$vuetify.display.smAndDown" max-width="500px" persistent>
    <v-card>
      <v-card-title>{{ task?.id ? 'Edit Task' : 'Add Task' }}</v-card-title>

      <v-card-text>
        <v-form ref="formRef" v-model="isFormValid">
          <v-text-field v-model="localTask.title" label="Title" :rules="[rules.required]" required />
          <v-textarea v-model="localTask.description" label="Description" />
          <v-text-field v-model="localTask.dueDate" label="Due Date" type="date" :rules="[rules.required]" required />
          <v-select v-model="localTask.status" :items="['To Do', 'In Progress', 'Completed']" label="Status"
            :rules="[rules.required]" required />
          <v-select v-model="localTask.priority" :items="['Low', 'Medium', 'High']" label="Priority"
            :rules="[rules.required]" required />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="modelValue = false">Cancel</v-btn>
        <v-btn color="primary" @click="handleSubmit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ task: any; modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'save'])

const modelValue = ref(props.modelValue)
watch(() => props.modelValue, (v) => (modelValue.value = v))
watch(modelValue, (v) => emit('update:modelValue', v))

const localTask = ref({
  id: null,
  title: '',
  description: '',
  dueDate: '',
  status: 'To Do',
  priority: 'Medium',
})
watch(
  () => props.task,
  (newVal) => {
    localTask.value = newVal
      ? { ...newVal }
      : { id: null, title: '', description: '', dueDate: '', status: 'To Do', priority: 'Medium' }
  },
  { immediate: true }
)

const formRef = ref()
const isFormValid = ref(false)

const rules = {
  required: (v: string) => (!!v && v.trim() !== '') || 'This field is required',
}

function handleSubmit() {
  if (!formRef.value) return

  formRef.value.validate().then((result: { valid: boolean }) => {
    if (result?.valid) {
      emit('save', localTask.value)
      localTask.value = {
        id: null,
        title: '',
        description: '',
        dueDate: '',
        status: 'To Do',
        priority: 'Medium',
      }
      modelValue.value = false
    }
  })
}
</script>
