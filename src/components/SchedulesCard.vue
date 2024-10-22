<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">Schedules</div>
    </q-card-section>

    <q-separator />

    <q-card-section v-for="(value, key) in scheduleStore.schedules" :key="key">
      <div class="text-h6">{{ value.scheduled_at }}</div>
      <div>{{ value.scheduable_type }}</div>
      <div>{{ value.details }}</div>
      <div>{{ `completed: ${value.completed}` }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { onMounted } from 'vue'
import { useScheduleStore } from 'stores/schedule_store'
import { useUserStore } from 'stores/user_store'

const scheduleStore = useScheduleStore()
const userStore = useUserStore()

onMounted(async () => {
  await scheduleStore.getForUser(userStore.id)
})

</script>
