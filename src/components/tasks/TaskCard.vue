<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Task</div>
    </q-card-section>

    <q-separator />

    <q-card-section v-if="task">
      <div>{{ task.name }}</div>
      <div>{{ task.description }}</div>
      <div>{{ task.status }}</div>
      <div>{{ task.initiated_at }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup>
const props = defineProps({
  taskId: {
    type: String,
    required: true
  }
})

import { ref, onBeforeMount } from 'vue'
import { useTaskStore } from 'stores/task_store'

const task = ref(null)
const taskStore = useTaskStore()

onBeforeMount(async () => {
  task.value = await taskStore.findById(props.taskId)
})

</script>
