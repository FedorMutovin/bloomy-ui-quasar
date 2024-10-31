<template>
  <ItemListCard
    :icon="'mdi-clipboard-text-outline'"
    :resource="'goals'"
    :items="goalStore.goals"
  >
    <template #body="{ item }">
      <q-item-section>
        <q-item-label>{{ item.name }}</q-item-label>
        <q-item-label caption>{{ $t(`statuses.${item.status}`)}}</q-item-label>
      </q-item-section>
    </template>
  </ItemListCard>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGoalStore } from 'stores/goal_store'
import { useUserStore } from 'stores/user_store'
import ItemListCard from 'components/ItemListCard.vue'

const goalStore = useGoalStore()
const userStore = useUserStore()

onMounted(async () => {
  await goalStore.getForUser(userStore.id)
})

</script>
