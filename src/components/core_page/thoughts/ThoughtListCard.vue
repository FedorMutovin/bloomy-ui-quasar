<template>
  <RootListCard
    :icon="rootTypeStore.getIconByRootName('Thought')"
    resource="thoughts"
    :items="thoughtStore.thoughts"
    @item-selected="handleItemSelected"
  >
    <template #body="{ item }">
      <q-card-section>
        <q-item-label caption>{{ item.description }}</q-item-label>
      </q-card-section>
    </template>

    <template #form="{ close }">
      <ThoughtForm @close="close" />
    </template>
  </RootListCard>
</template>

<script setup>
import { useThoughtStore } from 'stores/thought_store'
import { useRootTypeStore } from 'stores/root_type_store'
import RootListCard from 'components/RootListCard.vue'
import ThoughtForm from 'components/core_page/thoughts/ThoughtForm.vue'

const thoughtStore = useThoughtStore()
const rootTypeStore = useRootTypeStore()

const emit = defineEmits(['item-selected'])

function handleItemSelected (itemId) {
  emit('item-selected', itemId)
}
</script>
