<template>
  <EventListCard
    :icon="eventTypeStore.getIconByEventName('wish')"
    resource="wishes"
    :items="wishStore.wishes"
    @item-selected="handleItemSelected"
  >
    <template #body="{ item }">
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>{{ item.description }}</q-item-label>
        </q-card-section>

        <q-card-section class="col-6">
          <div>
            <q-item-label caption>{{ $t('attributes.priority') }}</q-item-label>
            <div class="text-secondary">
              <q-icon
                size="20px"
                v-for="index in 5"
                :key="index"
                :name="index <= 5 - item.priority ? 'mdi-sprout' : 'mdi-sprout-outline'"
              />
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </template>

    <template #form="{ close }">
      <WishForm @close="close" />
    </template>
  </EventListCard>
</template>

<script setup>
import { useWishStore } from 'stores/wish_store'
import { useEventTypeStore } from 'stores/event_type_store'
import EventListCard from 'components/EventListCard.vue'
import WishForm from 'components/core_page/wishes/WishForm.vue'

const wishStore = useWishStore()
const eventTypeStore = useEventTypeStore()

const emit = defineEmits(['item-selected'])

function handleItemSelected (itemId) {
  emit('item-selected', itemId)
}
</script>
