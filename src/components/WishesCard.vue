<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Wishes</div>
    </q-card-section>

    <q-separator />

    <q-card-section v-for="(value, key) in wishStore.wishes" :key="key">
      <div>{{ value.title }}</div>
      <div>{{ value.description }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { onMounted } from 'vue'
import { useWishStore } from 'stores/wish_store'
import { useUserStore } from 'stores/user_store'

const wishStore = useWishStore()
const userStore = useUserStore()

onMounted(async () => {
  await wishStore.getForUser(userStore.id)
})

</script>
