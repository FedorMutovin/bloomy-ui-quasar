<template>
  <div class="flex">
    <div class="row">
      <div class="col">
        <GoalsCard/>
      </div>
      <div class="col">
        <WishesCard/>
      </div>
    </div>
  </div>
</template>
<script setup>
import GoalsCard from 'components/GoalsCard.vue'
import WishesCard from 'components/WishesCard.vue'
import { onMounted } from 'vue'
import { useUserStore } from 'stores/user_store'

const userStore = useUserStore()

onMounted(async () => {
  if (!userStore.id) {
    await userStore.getCurrent()
  }
})
</script>
