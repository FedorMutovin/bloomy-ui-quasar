<template>
  <div class="flex justify-center column">
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-if="goal" filled v-model="goal.name" hint="Readonly" label="Name" readonly/>
      </div>
      <div class="col-6">
        <q-input v-if="goal" filled v-model="goal.status" hint="Readonly" label="Status" readonly/>
      </div>
      <div class="col-6">
        <q-input v-if="goal" filled v-model="goal.started_at" hint="Readonly" label="Started" readonly/>
      </div>
    </div>
    <div class="row justify-center" v-if="goal && goal.tasks">
      <div class="col-4" v-for="task in goal.tasks" :key="task.id">
        <TaskCard :task="task" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  goalId: {
    type: String,
    required: true
  }
})

import { ref, onBeforeMount } from 'vue'
import { useGoalStore } from 'stores/goal_store'
import TaskCard from 'components/tasks/TaskCard.vue'

const goal = ref(null)
const goalStore = useGoalStore()

onBeforeMount(async () => {
  goal.value = await goalStore.findGoalById(props.goalId)
})

</script>
