<template>
  <RootListCard
    :icon="rootTypeStore.getIconByRootName('goal')"
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
  </RootListCard>
</template>

<script setup>
import { useGoalStore } from 'stores/goal_store'
import RootListCard from 'components/RootListCard.vue'
import GoalForm from 'components/core_page/goals/GoalForm.vue'
import { useRootTypeStore } from 'stores/root_type_store'
import EngagementForm from 'components/EngagementForm.vue'

const rootTypeStore = useRootTypeStore()
const goalStore = useGoalStore()

const emit = defineEmits(['item-selected'])

function handleItemSelected (itemId) {
  emit('item-selected', itemId)
}
</script>
