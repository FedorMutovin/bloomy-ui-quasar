<template>
  <div class="flex row">
    <div class="col-12 col-md-3">
      <TravelListCard @item-selected="handleSelected"/>
    </div>
    <div class="col-12 col-md-9">
      <TravelCard :travelId="id" v-if="id"/>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import TravelListCard from 'components/core_page/travels/TravelListCard.vue'
import TravelCard from 'components/core_page/travels/TravelCard.vue'
import { useTravelStore } from 'stores/travel_store'

const id = ref(null)
const travelStore = useTravelStore()

function handleSelected (selectedId) {
  id.value = selectedId
}

onMounted(async () => {
  console.log('travels', travelStore.travels)
  await travelStore.getForUser()
  if (travelStore.travels) {
    id.value = travelStore.travels[0].id
  }
})
</script>
