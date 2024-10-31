<template>
  <ItemListCard
    :icon="'mdi-notebook-heart-outline'"
    :resource="'wishes'"
    :items="wishStore.wishes"
  >
    <template #body="{ item }">
      <q-item-section>
        <q-item-label>{{ item.title }}</q-item-label>
        <q-item-label caption>{{ item.description }}</q-item-label>
      </q-item-section>
    </template>

    <template #form="{ close }">
      <WishForm @close="close" />
    </template>
  </ItemListCard>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWishStore } from 'stores/wish_store'
import { useUserStore } from 'stores/user_store'
import ItemListCard from 'components/ItemListCard.vue'
import WishForm from 'components/wishes/WishForm.vue'

const wishStore = useWishStore()
const userStore = useUserStore()

onMounted(async () => {
  await wishStore.getForUser(userStore.id)
})
</script>
