<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ $t(`forms.create.${resource}.title`) }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none row">
      <EventRelationSelect v-if="withTrigger" class="q-ma-sm col-12" @update:selected-event="handleSelectedEvent"/>
      <q-input clearable color="accent" :label="$t('attributes.name')" v-model="localEvent.name" autofocus class="q-ma-sm col-12" />
      <q-input clearable color="accent" autogrow :label="$t('attributes.description')" v-model="localEvent.description" class="q-ma-sm col-12" />
      <div class="col-12 col-md-6">
        <q-item-label class="q-mt-md q-ml-sm" caption>{{ $t('attributes.priority') }}</q-item-label>
        <q-rating
          v-model="displayPriority"
          size="md"
          color="secondary"
          icon="mdi-leaf-circle-outline"
          icon-selected="mdi-leaf-circle"
          class="q-ma-sm"
        />
      </div>
      <div class="col-12 col-md-6">
        <div class="row">
          <q-toggle class="col-6 col-md-6" v-model="backdate" :label="$t('forms.create.backdate')" color="secondary" />
          <q-icon class="col-2" size="sm" name="mdi-help-circle-outline" color="accent" >
            <q-tooltip class="bg-accent text-body2" anchor="top middle" self="center middle">
              {{ $t('forms.create.backdate_tip') }}
            </q-tooltip>
          </q-icon>
        </div>
        <div v-if="backdate">
          <q-item-label class="q-mt-md q-ml-sm" caption>{{ $t('attributes.initiated_at') }}</q-item-label>
          <DateTimePicker v-model="localEvent.initiated_at" class="q-ma-sm"/>
        </div>
      </div>
      <slot name="nested-forms"></slot>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <template v-if="$slots.actions">
        <slot name="actions" />
      </template>
      <template v-else>
        <q-btn flat color="accent" :label="$t('buttons.cancel')" @click="closeForm" />
        <q-btn :loading="loading" flat color="accent" :label="$t('buttons.save')" @click="submitForm" />
      </template>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import EventRelationSelect from 'components/EventRelationSelect.vue'
import DateTimePicker from 'components/DateTimePicker.vue'

const emit = defineEmits(['close', 'submit', 'update:modelValue'])

const props = defineProps({
  resource: {
    type: String,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  },
  trigger: {
    type: Object,
    default: () => {}
  },
  withTrigger: {
    type: Boolean,
    default: true
  }
})

const localEvent = reactive({ ...props.modelValue })

const loading = ref(false)
const backdate = ref(false)
const maxPriority = 5
const displayPriority = computed({
  get: () => maxPriority - localEvent.priority,
  set: (value) => {
    localEvent.priority = maxPriority - value
  }
})

function closeForm () {
  emit('close')
}

watch(backdate, (newVal) => {
  if (newVal === false) {
    localEvent.initiated_at = new Date().toISOString().slice(0, 16).replace('T', ' ')
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(localEvent, newValue)
  },
  { deep: true, immediate: true }
)

watch(
  localEvent,
  (newValue) => {
    emit('update:modelValue', { ...newValue })
  },
  { deep: true }
)

function submitForm () {
  loading.value = true
  emit('submit', localEvent)
  loading.value = false
  closeForm()
}

function handleSelectedEvent (event) {
  localEvent.trigger = event
}
</script>
