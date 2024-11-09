<template>
  <EventForm v-model="goal" resource="goals" @submit="handleFormSubmit">
    <template #nested-forms>
      <TaskFormList @update:tasks="updateGoalTasks"/>
    </template>
  </EventForm>
</template>

<script setup>
import { ref } from 'vue'
import EventForm from 'components/EventForm.vue'
import TaskFormList from 'components/goals/form/TaskFormList.vue'
import { useGoalStore } from 'stores/goal_store'

const goalStore = useGoalStore()

const goal = ref({
  name: null,
  description: null,
  priority: 4,
  initiated_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
  tasks_attributes: []
})

function updateGoalTasks (tasks) {
  goal.value.tasks_attributes = [...tasks]
}
async function handleFormSubmit () {
  await goalStore.create(goal.value)
}
</script>
