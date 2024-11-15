<template>
  <GoalCard :goal-id="goalId"/>
</template>

<script setup>

import { useRoute } from 'vue-router'
import GoalCard from 'components/goals/GoalCard.vue'
const route = useRoute()
const goalId = route.params.id
</script>
