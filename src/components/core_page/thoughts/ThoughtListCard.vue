<template>
  <EventListCard
    :icon="eventTypeStore.getIconByEventName('Thought')"
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
  </EventListCard>
</template>

<script setup>
import { useThoughtStore } from 'stores/thought_store'
import { useEventTypeStore } from 'stores/event_type_store'
import EventListCard from 'components/EventListCard.vue'
import ThoughtForm from 'components/core_page/thoughts/ThoughtForm.vue'

const thoughtStore = useThoughtStore()
const eventTypeStore = useEventTypeStore()

const emit = defineEmits(['item-selected'])

function handleItemSelected (itemId) {
  emit('item-selected', itemId)
}
</script>
