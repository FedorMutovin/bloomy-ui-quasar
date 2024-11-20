<template>
  <q-select
    v-model="localEventType"
    color="primary"
    :readonly="eventType !== null"
    :options="eventTypeStore.eventNames"
    :label="$t('forms.create.event_type.label')"
    behavior="menu"
    stack-label
    @update:model-value="emitSelectedEvent"
    :hint="$t('forms.create.event_type.info')"
  >
    <template v-slot:selected-item="scope">
      <q-item-section avatar>
        <q-icon :name="eventTypeStore.getIconByEventName(scope.opt)" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ scope.opt }}</q-item-label>
      </q-item-section>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="eventTypeStore.getIconByEventName(scope.opt)" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useEventTypeStore } from 'stores/event_type_store'
const eventTypeStore = useEventTypeStore()

const emit = defineEmits(['update:selected-event'])
const localEventType = ref(null)

const props = defineProps({
  eventType: {
    type: String,
    default: null
  }
})

function emitSelectedEvent (newEvent) {
  localEventType.value = newEvent
  emit('update:selected-event', newEvent)
}

onMounted(async () => {
  if (props.eventType) {
    const selectedEvent = eventTypeStore.event_types.find(ev => ev.name === props.eventType)
    localEventType.value = selectedEvent.name || null
  }
})
</script>
