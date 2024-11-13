<template>
  <EventListCard
    :icon="eventTypeStore.getIconByEventName('Goal')"
    resource="goals"
    :items="goalStore.goals"
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
      </q-item-section>
    </template>

    <template #form="{ close }">
      <GoalForm @close="close" />
    </template>
  </EventListCard>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGoalStore } from 'stores/goal_store'
import { useUserStore } from 'stores/user_store'
import EventListCard from 'components/EventListCard.vue'
import GoalForm from 'components/goals/GoalForm.vue'
import { useEventTypeStore } from 'stores/event_type_store'

const eventTypeStore = useEventTypeStore()
const goalStore = useGoalStore()
const userStore = useUserStore()

onMounted(async () => {
  await goalStore.getForUser(userStore.id)
})

</script>
