<template>
  <div class="flex">
    <div class="row justify-center">
      <div class="col-12 col-md-3 q-pa-md">
        <GoalsCard/>
      </div>
      <div class="col-12 col-md-3 q-pa-md">
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
