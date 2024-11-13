<template>
  <EventListCard
    :icon="'mdi-notebook-heart-outline'"
    resource="wishes"
    :items="wishStore.wishes"
  >
    <template #body="{ item }">
      <q-item-section>
        <q-item-label>{{ item.name }}</q-item-label>
        <q-item-label caption>{{ item.description }}</q-item-label>
      </q-item-section>
    </template>

    <template #form="{ close }">
      <WishForm @close="close" />
    </template>
  </EventListCard>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWishStore } from 'stores/wish_store'
import { useUserStore } from 'stores/user_store'
import EventListCard from 'components/EventListCard.vue'
import WishForm from 'components/wishes/WishForm.vue'

const wishStore = useWishStore()
const userStore = useUserStore()

onMounted(async () => {
  await wishStore.getForUser(userStore.id)
})
</script>
