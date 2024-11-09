<template>
  <q-list  bordered separator>
    <q-item v-for="quote in everydayQuoteStore.quotes" :key="quote.id">
      <q-item-section class="text-center">
        {{ quote.description }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { onMounted } from 'vue'

import { useEverydayQuoteStore } from 'stores/everyday_quote_store'

const everydayQuoteStore = useEverydayQuoteStore()

onMounted(async () => {
  await everydayQuoteStore.getForUser()
})
</script>
