<template>
  <div class="flex">
    <div class="row justify-center">
      <div class="col-12 col-md-3 q-pa-md">
        <GoalListCard/>
      </div>
      <div class="col-12 col-md-3 q-pa-md">
        <WishListCard/>
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

import GoalListCard from 'components/goals/GoalListCard.vue'
import WishListCard from 'components/wishes/WishListCard.vue'
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
