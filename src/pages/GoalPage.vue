<template>
  <GoalForm :goalId="goalId"/>
</template>

<script setup>
defineOptions({
  name: 'GoalPage'
})

import { useRoute } from 'vue-router'
const route = useRoute()
const goalId = route.params.id

import GoalForm from 'components/goals/GoalForm.vue'
</script>
