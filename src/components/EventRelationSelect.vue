<template>
  <q-select
    v-model="event"
    stack-label
    color="accent"
    :options="eventStore.events"
    :label="$t('forms.create.based_on')"
    :display-value="displayValue"
    @update:model-value="emitSelectedEvent"
  >
    <template v-slot:append>
      <q-icon
        v-if="event !== null"
        class="cursor-pointer"
        name="clear"
        @click.stop.prevent="clearEvent"
      />
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="iconMap[scope.opt.event_type]" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.name }}</q-item-label>
          <q-item-label caption>{{ scope.opt.event_type }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useEventStore } from 'stores/event_store'
import { useUserStore } from 'stores/user_store'
const eventStore = useEventStore()
const userStore = useUserStore()

const emit = defineEmits(['update:selected-event'])

const event = ref(null)
const iconMap = {
  Task: 'mdi-clipboard-text-outline',
  Goal: 'mdi-sprout-outline',
  Wish: 'mdi-notebook-heart-outline'
}

function emitSelectedEvent (newEvent) {
  event.value = newEvent
  emit('update:selected-event', newEvent)
}

function clearEvent () {
  event.value = null
  emit('update:selected-event', null)
}

const displayValue = computed(() => {
  return event.value ? `${event.value.event_type}: ${event.value.name}` : ''
})

onMounted(async () => {
  await eventStore.getForUser(userStore.id)
})
</script>
