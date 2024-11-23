<template>
  <q-select
    v-model="root"
    stack-label
    color="primary"
    :readonly="rootId !== null"
    :options="options"
    :label="label"
    :hint="hint"
    :display-value="displayValue"
    @filter="filterFn"
    use-input
    behavior="menu"
    @update:model-value="emitSelectedRoot"
  >
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
          {{ $t('forms.create.root.no_option') }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useEventStore } from 'stores/event_store'
import { useEventTypeStore } from 'stores/event_type_store'
const eventStore = useEventStore()
const eventTypeStore = useEventTypeStore()

const props = defineProps({
  rootId: {
    type: String,
    default: null
  },
  label: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    default: null
  },
  filterBy: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:selected-root'])
const root = ref(null)
const options = ref([])

function emitSelectedRoot (newRoot) {
  root.value = newRoot
  emit('update:selected-root', newRoot)
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
  return root.value ? `${root.value.event_type}: ${root.value.name}` : ''
})

onMounted(async () => {
  await eventStore.getForUser()
  if (props.rootId) {
    const selectedEvent = eventStore.events.find(ev => ev.id === props.rootId)
    root.value = selectedEvent || null
    emit('update:selected-root', root.value)
  }
})
</script>
