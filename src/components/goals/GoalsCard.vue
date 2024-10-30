<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Goals</div>
    </q-card-section>

    <q-separator />

    <q-card-section v-for="(value, key) in goalStore.goals" :key="key">
      <div>{{ value.name }}</div>
      <div>{{ value.status }}</div>
      <div>{{ value.created_at }}</div>
      <router-link :to="`/goals/${value.id}`">
        Open
      </router-link>
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
