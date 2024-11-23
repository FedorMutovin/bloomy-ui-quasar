<template>
  <q-select
    v-model="event"
    stack-label
    color="primary"
    :readonly="triggerId !== null"
    :options="options"
    :label="$t('forms.create.trigger.label')"
    :display-value="displayValue"
    @filter="filterFn"
    use-input
    behavior="menu"
    @update:model-value="emitSelectedEvent"
    :hint="$t('forms.create.trigger.info')"
  >
    <template v-slot:append>
      <q-icon
        v-if="event !== null && triggerId !== null"
        class="cursor-pointer"
        name="clear"
        @click.stop.prevent="clearEvent"
      />
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="eventTypeStore.getIconByEventName(scope.opt.event_type.toLowerCase())" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.name }}</q-item-label>
          <q-item-label caption>{{ scope.opt.event_type }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section>
          {{ $t('forms.create.trigger.no_option') }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useEventStore } from 'stores/event_store'
import { useEventTypeStore } from 'stores/event_type_store'
import { useUserStore } from 'stores/user_store'
const eventStore = useEventStore()
const eventTypeStore = useEventTypeStore()
const userStore = useUserStore()

const props = defineProps({
  triggerId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:selected-event'])
const event = ref(null)
const options = ref([])

function emitSelectedEvent (newEvent) {
  event.value = newEvent
  emit('update:selected-event', newEvent)
}

function clearEvent () {
  event.value = null
  emit('update:selected-event', null)
}

function filterFn (val, update) {
  if (val === '') {
    update(() => {
      options.value = eventStore.events
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = eventStore.events.filter(event => event.name.toLowerCase().includes(needle))
  })
}

const displayValue = computed(() => {
  return event.value ? `${event.value.event_type}: ${event.value.name}` : ''
})

onMounted(async () => {
  await eventStore.getForUser(userStore.id)
  if (props.triggerId) {
    const selectedEvent = eventStore.events.find(ev => ev.id === props.triggerId)
    event.value = selectedEvent || null
  }
})
</script>
