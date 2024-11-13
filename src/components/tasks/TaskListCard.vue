<template>
  <EventListCard
    :icon="'mdi-clipboard-text-outline'"
    resource="tasks"
    :items="taskStore.tasks"
  >
    <template #body="{ item }">
      <q-item-section>
        <q-item-label>{{ item.name }}</q-item-label>
        <q-item-label caption>{{ item.description }}</q-item-label>
        <q-item-label caption>{{ $t(`statuses.${item.status}`)}}</q-item-label>
      </q-item-section>
    </template>

    <template #form="{ close }">
      <TaskForm @close="close" />
    </template>
  </EventListCard>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from 'stores/task_store'
import { useUserStore } from 'stores/user_store'
import EventListCard from 'components/EventListCard.vue'
import TaskForm from 'components/tasks/TaskForm.vue'

const taskStore = useTaskStore()
const userStore = useUserStore()

onMounted(async () => {
  await taskStore.getForUser(userStore.id)
})
</script>
