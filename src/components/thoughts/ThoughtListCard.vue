<template>
  <EventListCard
    :icon="eventTypeStore.getIconByEventName('Thought')"
    resource="thoughts"
    :items="thoughtStore.thoughts"
  >
    <template #body="{ item }">
      <q-item-section>
        <q-item-label caption>{{ item.description }}</q-item-label>
      </q-item-section>
    </template>

    <template #form="{ close }">
      <ThoughtForm @close="close" />
    </template>
  </EventListCard>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThoughtStore } from 'stores/thought_store'
import { useUserStore } from 'stores/user_store'
import { useEventTypeStore } from 'stores/event_type_store'
import EventListCard from 'components/EventListCard.vue'
import ThoughtForm from 'components/thoughts/ThoughtForm.vue'

const thoughtStore = useThoughtStore()
const eventTypeStore = useEventTypeStore()
const userStore = useUserStore()

onMounted(async () => {
  await thoughtStore.getForUser(userStore.id)
})
</script>
