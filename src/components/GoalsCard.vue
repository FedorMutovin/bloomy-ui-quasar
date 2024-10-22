<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Goals</div>
    </q-card-section>

    <q-separator />

    <q-card-section v-for="(value, key) in goalStore.goals" :key="key">
      <div class="text-h6">{{ value.name }}</div>
      <div class="text-h6">{{ value.created_at }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { onMounted } from 'vue'
import { useGoalStore } from 'stores/goal_store'
import { useUserStore } from 'stores/user_store'

const goalStore = useGoalStore()
const userStore = useUserStore()

onMounted(async () => {
  await goalStore.getForUser(userStore.id)
})

</script>
