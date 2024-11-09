<template>
  <EventForm v-model="task" resource="tasks" @submit="handleFormSubmit"/>
</template>
<script setup>
import EventForm from 'components/EventForm.vue'
import { useTaskStore } from 'stores/task_store'
import { reactive } from 'vue'

const taskStore = useTaskStore()

const task = reactive({
  name: null,
  description: null,
  priority: 4,
  initiated_at: new Date().toISOString().slice(0, 16).replace('T', ' ')
})
async function handleFormSubmit (task) {
  await taskStore.create(task)
}

</script>
