<template>
  <q-card class="flex q-ma-sm row justify-center">
    <div class="col-12">
      <EverydayQuotesList />
    </div>
    <div class="col-12">
      <q-card class="q-ma-sm">
        <q-tabs
          inline-label
          class="bg-primary text-white shadow-2"
          align="center"
        >
          <q-route-tab
            v-for="eventType in eventTypeStore.event_types"
            :to="`${eventType.tab_path}`"
            exact
            :key="eventType.id"
            :name="eventType.name"
            :icon="eventType.icon"
            :label="eventType.name" />
        </q-tabs>
        <router-view />
      </q-card>
    </div>
  </q-card>
</template>

<script setup>
import EverydayQuotesList from 'components/everyday_quotes/EverydayQuotesList.vue'
import { useEventTypeStore } from 'stores/event_type_store'
const eventTypeStore = useEventTypeStore()
</script>
