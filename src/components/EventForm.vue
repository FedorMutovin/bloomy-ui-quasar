<template>
  <q-card style="width: 700px; max-width: 1000px">
    <q-card-section class="row justify-between items-center">
      <div class="text-h6 col-11">{{ header }}</div>
      <q-btn padding="none" square flat round icon="mdi-close" @click="closeForm"/>
    </q-card-section>

    <q-separator/>

    <q-scroll-area :style="{ height: localEventType ? '500px' : '250px', maxWidth: '1000px' }">
      <q-card-section class="row">
        <EventRelationSelect
          class="col-12 col-md-7"
          :trigger-id="triggerId"
          @update:selected-event="handleSelectedEvent"
        />
      </q-card-section>

      <q-card-section class="row">
        <EventTypeSelect class="col-12 col-md-7" :event-type="eventType" @update:selected-event="handleSelectedType"/>
      </q-card-section>

      <div v-if="localEventType">
        <q-separator spaced inset />

        <q-card-section class="row">
          <div class="text-subtitle2 col-12">{{ $t('forms.create.event_details_header') }}</div>
          <q-input
            outlined
            clearable
            stack-label
            :placeholder="$t('attributes.hints.name')"
            color="primary"
            :label="$t('attributes.name')"
            v-model="localEvent.name"
            autofocus
            class="q-mt-md col-12"
          />
          <q-input
            outlined
            clearable
            color="primary"
            autogrow
            stack-label
            :label="$t('attributes.description')"
            v-model="localEvent.description"
            :placeholder="$t('attributes.hints.description')"
            class="q-mt-md col-12"
          />
        </q-card-section>

        <component
          :is="formFieldsComponentMap[localEventType]"
          @updateLocalEvent="updateLocalEvent"
        />

        <q-separator spaced inset />

        <q-card-section class="row justify-start items-center">
          <div class="col-12 col-md-6">
            <q-item-label class="q-mt-md q-ml-sm" caption>{{ $t('attributes.initiated_at') }}</q-item-label>
            <DateTimePicker v-model="initiatedAt"/>
          </div>
        </q-card-section>
      </div>
    </q-scroll-area>

    <q-separator v-if="localEventType"/>

    <q-card-actions v-if="localEventType" align="right" class="text-primary">
      <template v-if="$slots.actions">
        <slot name="actions" />
      </template>
      <template v-else>
        <q-btn flat color="primary" :label="$t('buttons.cancel')" @click="closeForm" />
        <q-btn :loading="loading" push color="primary" :label="$t('buttons.save')" @click="submitForm" />
      </template>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import EventRelationSelect from 'components/forms/EventRelationSelect.vue'
import EventTypeSelect from 'components/forms/EventTypeSelect.vue'
import DateTimePicker from 'components/forms/DateTimePicker.vue'
import TaskFields from 'components/core_page/roots/tasks/forms/TaskFields.vue'
import GoalFields from 'components/core_page/roots/goals/forms/GoalFields.vue'
import { useTaskStore } from 'stores/task_store'
import { useGoalStore } from 'stores/goal_store'
import { useActionStore } from 'stores/action_store'
import { useWishStore } from 'stores/wish_store'
import { useThoughtStore } from 'stores/thought_store'
import { getFormattedDate, getUTCDate } from 'src/utils/formattedDate'

const $q = useQuasar()
const { t } = useI18n()
const taskStore = useTaskStore()
const goalStore = useGoalStore()
const actionStore = useActionStore()
const wishStore = useWishStore()
const thoughtStore = useThoughtStore()
const emit = defineEmits(['close', 'submit', 'update:modelValue'])

const props = defineProps({
  header: {
    type: String,
    required: true
  },
  triggerId: {
    type: String,
    default: null
  },
  eventType: {
    type: String,
    default: null
  }
})

const formFieldsComponentMap = {
  task: TaskFields,
  goal: GoalFields
}

const formStoresMap = {
  task: taskStore,
  goal: goalStore,
  action: actionStore,
  wish: wishStore,
  thought: thoughtStore
}

const extraFields = ref({})

const localEventType = ref(props.eventType)

const localEvent = reactive({
  name: null,
  description: null,
  priority: 4,
  initiated_at: getFormattedDate()
})

const loading = ref(false)
const initiatedAt = ref(getFormattedDate())

function closeForm () {
  emit('close')
}

async function submitForm () {
  try {
    loading.value = true
    if (Object.keys(extraFields.value).length > 0) {
      Object.assign(localEvent, extraFields.value)
    }

    if (!localEvent.description) {
      delete localEvent.description
    }

    localEvent.initiated_at = getUTCDate(initiatedAt.value)
    const store = formStoresMap[localEventType.value]

    await store.create(localEvent)
    $q.notify({
      type: 'positive',
      message: t('messages.positive'),
      position: 'top',
      actions: [
        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
      ]
    })
    closeForm()
  } catch (errors) {
    console.log('errors', errors)
    const message = Object.entries(errors.response.data.errors)
      .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
      .join('; ')
    $q.notify({
      type: 'negative',
      position: 'top',
      message,
      actions: [
        { icon: 'close', color: 'white', round: true }
      ]
    })
  } finally {
    loading.value = false
  }
}

function handleSelectedEvent (event) {
  localEvent.trigger = event
}

function handleSelectedType (type) {
  localEventType.value = type
  extraFields.value = {}
}

function updateLocalEvent (newFields) {
  extraFields.value = newFields
  console.log('extra', extraFields.value)
}
</script>
