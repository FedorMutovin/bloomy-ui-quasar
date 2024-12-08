<template>
  <RootListCard
    :icon="rootTypeStore.getIconByRootName('Travel')"
    resource="travels"
    :items="travelStore.travels"
    @item-selected="handleItemSelected"
  >
    <template #body="{ item }">
      <q-card-section>
        <q-item-label caption>{{ item.destination }}</q-item-label>
      </q-card-section>
    </template>

    <template #form="{ close }">
      <TravelForm @close="close" />
    </template>
  </RootListCard>
</template>

<script setup>
import { useTravelStore } from 'stores/travel_store'
import { useRootTypeStore } from 'stores/root_type_store'
import RootListCard from 'components/RootListCard.vue'
import TravelForm from 'components/core_page/travels/TravelForm.vue'

const travelStore = useTravelStore()
const rootTypeStore = useRootTypeStore()

const emit = defineEmits(['item-selected'])

function handleItemSelected (itemId) {
  emit('item-selected', itemId)
}
</script>
