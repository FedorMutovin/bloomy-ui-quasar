<template>
  <q-card class="q-ma-sm">
    <q-carousel
      v-model="slide"
      swipeable
      animated
      arrows
      :padding="true"
      control-color="black"
      infinite
      class="text-black bordered rounded-borders"
      style="height: 5em"
      control-type="flat"
      v-if="everydayQuoteStore.quotes && everydayQuoteStore.quotes.length > 0"
    >
      <q-carousel-slide
        v-for="quote in everydayQuoteStore.quotes"
        :key="quote.id"
        :name="quote.id"
      >
        <div class="q-mt-sm text-center text-subtitle2 text-weight-light">
          {{ quote.description }}
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-btn v-else class="full-width" flat color="primary" icon="mdi-plus-circle-outline"/>
  </q-card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useEverydayQuoteStore } from 'stores/everyday_quote_store'

const slide = ref(null)

const everydayQuoteStore = useEverydayQuoteStore()

onMounted(async () => {
  await everydayQuoteStore.getForUser()

  if (everydayQuoteStore.quotes.length > 0) {
    slide.value = everydayQuoteStore.quotes[0].id
  }
})

watch(() => everydayQuoteStore.quotes, (newQuotes) => {
  if (newQuotes.length > 0 && slide.value === null) {
    slide.value = newQuotes[0].id
  }
})
</script>
