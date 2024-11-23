<template>
  <div class="flex row">
    <div class="col-12 col-md-3">
      <GoalListCard @item-selected="handleGoalSelected"/>
    </div>
    <div class="col-12 col-md-9">
      <GoalCard :goalId="goalId" v-if="goalId"/>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import GoalListCard from 'components/core_page/goals/GoalListCard.vue'
import GoalCard from 'components/core_page/goals/GoalCard.vue'
import { useGoalStore } from 'stores/goal_store'

const goalId = ref(null)
const goalStore = useGoalStore()

function handleGoalSelected (selectedId) {
  goalId.value = selectedId
}

onMounted(async () => {
  await goalStore.getForUser()
  if (goalStore.goals) {
    goalId.value = goalStore.goals[0].id
  }
})
</script>
