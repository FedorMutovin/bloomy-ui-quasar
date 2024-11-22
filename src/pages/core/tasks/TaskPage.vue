<template>
  <TaskCard :task-id="taskId"/>
</template>

<script setup>

import { useRoute } from 'vue-router'
import TaskCard from 'components/tasks/TaskCard.vue'
const route = useRoute()
const taskId = route.params.id
</script>
