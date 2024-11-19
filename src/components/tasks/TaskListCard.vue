<template>
  <EventListCard
    :icon="eventTypeStore.getIconByEventName('Task')"
    resource="tasks"
    :items="taskStore.tasks"
  >
    <template #body="{ item }">
      <q-item-section>
        <q-item-label>{{ item.name }}</q-item-label>
        <q-item-label caption>{{ item.description }}</q-item-label>
        <q-item-label caption>{{ $t(`statuses.${item.status}`)}}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-item-label caption>{{ $t('attributes.priority') }}</q-item-label>
        <div class="text-secondary">
          <q-icon
            v-for="index in 5"
            :key="index"
            :name="index <= 5 - item.priority ? 'mdi-leaf-circle' : 'mdi-leaf-circle-outline'"
          />
        </div>
        <EngagementForm :engagement-value="item.engagement" v-if="item.engagement !== null" />
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
import { useEventTypeStore } from 'stores/event_type_store'
import EngagementForm from 'components/EngagementForm.vue'

const eventTypeStore = useEventTypeStore()
const taskStore = useTaskStore()
const userStore = useUserStore()

onMounted(async () => {
  await taskStore.getForUser(userStore.id)
})
</script>
