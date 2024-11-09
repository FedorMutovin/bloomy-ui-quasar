<template>
  <EventListCard
    :icon="'mdi-sprout-outline'"
    :resource="'goals'"
    :items="goalStore.goals"
  >
    <template #body="{ item }">
      <q-item-section>
        <q-item-label>{{ item.name }}</q-item-label>
        <q-item-label caption>{{ item.description }}</q-item-label>
        <q-item-label caption>{{ $t(`statuses.${item.status}`)}}</q-item-label>
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

const goalStore = useGoalStore()
const userStore = useUserStore()

onMounted(async () => {
  await goalStore.getForUser(userStore.id)
})

</script>
