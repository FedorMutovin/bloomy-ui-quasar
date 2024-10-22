<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Goals</div>
      <div class="text-subtitle2">Когда создаешь цель, будет лучше отразить какой то конкретный, конечный результат(например: Сьездить в Нью-Йорк на день рождения, для этого будет несколько задач, например получение визы, покупка билетов и т.д и в конце можно либо достигнуть результат, либо нет)</div>
    </q-card-section>

    <q-separator />

    <q-card-section v-for="(value, key) in goalStore.goals" :key="key">
      <div>{{ value.name }}</div>
      <div>{{ value.created_at }}</div>
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
