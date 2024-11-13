<template>
  <EventListCard
    :icon="eventTypeStore.getIconByEventName('Wish')"
    resource="wishes"
    :items="wishStore.wishes"
  >
    <template #body="{ item }">
      <q-item-section>
        <q-item-label>{{ item.name }}</q-item-label>
        <q-item-label caption>{{ item.description }}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-item-label caption>{{ $t('attributes.priority') }}</q-item-label>
        <div class="text-secondary">
          <q-icon
            v-for="index in 5"
            :key="index"
            :name="index <= 5 - item.priority ? 'mdi-leaf-circle' : 'mdi-leaf-circle-outline'"
          />
        </div>
      </q-item-section>
    </template>

    <template #form="{ close }">
      <WishForm @close="close" />
    </template>
  </EventListCard>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWishStore } from 'stores/wish_store'
import { useUserStore } from 'stores/user_store'
import { useEventTypeStore } from 'stores/event_type_store'
import EventListCard from 'components/EventListCard.vue'
import WishForm from 'components/wishes/WishForm.vue'

const wishStore = useWishStore()
const eventTypeStore = useEventTypeStore()
const userStore = useUserStore()

onMounted(async () => {
  await wishStore.getForUser(userStore.id)
})
</script>
