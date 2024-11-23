<template>
  <div class="flex row">
    <div class="col-12 col-md-3">
      <TaskListCard @item-selected="handleSelected"/>
    </div>
    <div class="col-12 col-md-9">
      <TaskCard :taskId="id" v-if="id"/>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import TaskListCard from 'components/core_page/tasks/TaskListCard.vue'
import TaskCard from 'components/core_page/tasks/TaskCard.vue'
import { useTaskStore } from 'stores/task_store'

const id = ref(null)
const taskStore = useTaskStore()

function handleSelected (selectedId) {
  id.value = selectedId
}

onMounted(async () => {
  await taskStore.getForUser()
  if (taskStore.tasks) {
    id.value = taskStore.tasks[0].id
  }
})
</script>
