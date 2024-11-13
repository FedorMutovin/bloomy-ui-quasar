<template>
  <EventListCard
    :icon="eventTypeStore.getIconByEventName('Action')"
    resource="actions"
    :items="actionStore.actions"
  >
    <template #body="{ item }">
      <q-item-section>
        <q-item-label>{{ item.name }}</q-item-label>
        <q-item-label caption>{{ item.description }}</q-item-label>
      </q-item-section>
    </template>

    <template #form="{ close }">
      <ActionForm @close="close" />
    </template>
  </EventListCard>
</template>

<script setup>
import { onMounted } from 'vue'
import { useActionStore } from 'stores/action_store'
import { useUserStore } from 'stores/user_store'
import { useEventTypeStore } from 'stores/event_type_store'
import EventListCard from 'components/EventListCard.vue'
import ActionForm from 'components/actions/ActionForm.vue'

const actionStore = useActionStore()
const eventTypeStore = useEventTypeStore()
const userStore = useUserStore()

onMounted(async () => {
  await actionStore.getForUser(userStore.id)
})
</script>
