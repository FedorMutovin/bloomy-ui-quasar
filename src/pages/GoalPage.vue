<template>
  <GoalCard :goalId="goalId"/>
</template>

<script setup>
defineOptions({
  name: 'GoalPage'
})

import { useRoute } from 'vue-router'
const route = useRoute()
const goalId = route.params.id

import GoalCard from 'components/goals/GoalCard.vue'
</script>
