<template>
  <div class="flex">
    <GoalsCard/>
  </div>
</template>
<script setup>
import GoalsCard from 'components/GoalsCard.vue'
import { onMounted } from 'vue'
import { useUserStore } from 'stores/user_store'

const userStore = useUserStore()

onMounted(async () => {
  if (!userStore.id) {
    await userStore.getCurrent()
  }
})
</script>
