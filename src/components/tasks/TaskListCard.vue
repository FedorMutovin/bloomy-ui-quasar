<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Tasks</div>
    </q-card-section>

    <q-separator />

    <q-card-section v-for="(value, key) in taskStore.tasks" :key="key">
      <div>{{ value.name }}</div>
      <div>{{ value.description }}</div>
      <div>{{ value.status }}</div>
      <div>{{ value.created_at }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from 'stores/task_store'
import { useUserStore } from 'stores/user_store'

const taskStore = useTaskStore()
const userStore = useUserStore()

onMounted(async () => {
  await taskStore.getForUser(userStore.id)
})

</script>
