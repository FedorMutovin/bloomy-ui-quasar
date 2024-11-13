<template>
  <q-card class="flex q-ma-sm">
    <div class="row justify-center">
      <div class="col-12">
        <EverydayQuotesList/>
      </div>
      <div class="col-4">
        <div class="row q-ma-sm">
          <div class="col-9">
            <WishListCard/>
          </div>
          <div class="col-9">
            <GoalListCard/>
          </div>
          <div class="col-9">
            <TaskListCard/>
          </div>
          <div class="col-9">
            <ActionListCard/>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col-12">
<!--            <EverydayQuotesList/>-->
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import EverydayQuotesList from 'components/everyday_quotes/EverydayQuotesList.vue'
import GoalListCard from 'components/goals/GoalListCard.vue'
import WishListCard from 'components/wishes/WishListCard.vue'
import TaskListCard from 'components/tasks/TaskListCard.vue'
import { onMounted } from 'vue'
import { useUserStore } from 'stores/user_store'
import ActionListCard from 'components/actions/ActionListCard.vue'

defineOptions({
  name: 'IndexPage'
})

const userStore = useUserStore()

onMounted(async () => {
  if (!userStore.id) {
    await userStore.getCurrent()
  }
})
</script>
