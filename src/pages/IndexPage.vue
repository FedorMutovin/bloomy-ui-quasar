<template>
  <div class="flex">
    <div class="row justify-center">
      <div class="col-12 col-md-3 q-pa-md">
        <GoalsCard/>
      </div>
      <div class="col-12 col-md-3 q-pa-md">
        <WishesCard/>
      </div>
      <div class="col-12 col-md-3 q-pa-md">
        <TaskListCard/>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'IndexPage'
})

import GoalsCard from 'components/goals/GoalsCard.vue'
import WishesCard from 'components/wishes/WishesCard.vue'
import TaskListCard from 'components/tasks/TaskListCard.vue'
import { onMounted } from 'vue'
import { useUserStore } from 'stores/user_store'

const userStore = useUserStore()

onMounted(async () => {
  if (!userStore.id) {
    await userStore.getCurrent()
  }
})
</script>
