<template>
  <EventListCard
    :icon="eventTypeStore.getIconByEventName('goal')"
    resource="goals"
    :items="goalStore.goals"
    @item-selected="handleItemSelected"
  >
    <template #body="{ item }">
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>{{ item.description }}</q-item-label>
          <q-item-label caption>{{ $t(`statuses.${item.status}`)}}</q-item-label>
        </q-card-section>

        <q-card-section class="col-6">
          <q-item-label caption>{{ $t('attributes.priority') }}</q-item-label>
          <div class="text-secondary">
            <q-icon
              size="20px"
              v-for="index in 5"
              :key="index"
              :name="index <= 5 - item.priority ? 'mdi-sprout' : 'mdi-sprout-outline'"
            />
          </div>

          <div class="q-pt-sm">
            <EngagementForm :engagement-value="item.engagement" v-if="item.engagement !== null" />
          </div>
        </q-card-section>
      </q-card-section>
    </template>

    <template #form="{ close }">
      <GoalForm @close="close" />
    </template>
  </EventListCard>
</template>

<script setup>
import { useGoalStore } from 'stores/goal_store'
import EventListCard from 'components/EventListCard.vue'
import GoalForm from 'components/core_page/roots/goals/GoalForm.vue'
import { useEventTypeStore } from 'stores/event_type_store'
import EngagementForm from 'components/EngagementForm.vue'

const eventTypeStore = useEventTypeStore()
const goalStore = useGoalStore()

const emit = defineEmits(['item-selected'])

function handleItemSelected (itemId) {
  emit('item-selected', itemId)
}
</script>
