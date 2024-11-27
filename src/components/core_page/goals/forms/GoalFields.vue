<template>
  <q-card-section class="row">
    <div class="text-subtitle2 col-12">{{ $t('forms.create.root_details_header') }}</div>
    <q-input
      outlined
      clearable
      stack-label
      :placeholder="$t('attributes.hints.name')"
      color="primary"
      :label="$t('attributes.name')"
      v-model="name"
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
      v-model="description"
      :placeholder="$t('attributes.hints.description')"
      class="q-mt-md col-12"
    />
  </q-card-section>

  <q-separator spaced inset />

  <q-card-section>
    <div>
      <q-checkbox color="secondary" dense size="sm" v-model="startImmediately" :label="$t('forms.create.attributes.start_immediately')" />
      <q-item-label class="q-mt-sm" caption>{{ $t('forms.create.hints.start_immediately_hint') }}</q-item-label>
    </div>
    <div class="q-mt-sm">
      <q-checkbox color="secondary" dense size="sm" v-model="deadline" :label="$t('forms.create.attributes.deadline')" />
      <q-item-label class="q-mt-sm" caption>{{ $t('forms.create.hints.deadline_hint') }}</q-item-label>
    </div>
    <div class="row q-mt-md" v-if="deadline">
      <DateTimePicker :label="$t('attributes.deadline_at')" v-model="deadlineAt"/>
    </div>
  </q-card-section>

  <q-separator spaced inset />

  <q-card-section>
    <div>
      <q-checkbox color="secondary" dense size="sm" v-model="engagement" :label="$t('forms.create.attributes.engagement')" />
      <q-item-label class="q-mt-sm" caption>{{ $t('forms.create.hints.engagement_hint') }}</q-item-label>
    </div>

    <div class="row">
      <div class="q-mt-sm col-12 col-md-6" v-if="engagement">
        <EngagementSelect v-model="selectedEngagementValue"/>
      </div>
    </div>
  </q-card-section>

  <q-separator spaced inset />

  <q-card-section>
    <PriorityRating :priority="localPriority" @update:priority="handlePriority" />
  </q-card-section>

  <q-separator spaced inset />

  <q-card-section class="row">
    <DateTimePicker :label="$t('attributes.initiated_at')" v-model="initiatedAt"/>
  </q-card-section>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { getFormattedDate, getUTCDate } from 'src/utils/formattedDate'
import PriorityRating from 'components/forms/PriorityRating.vue'
import DateTimePicker from 'components/forms/DateTimePicker.vue'
import EngagementSelect from 'components/engagements/EngagementSelect.vue'
import { useEngagementStore } from 'stores/engagement_store'

defineProps({
  labelEvent: {
    type: Object,
    default: () => ({})
  }
})

const engagementStore = useEngagementStore()
const emit = defineEmits(['updateLocalEvent'])

const startImmediately = ref(true)
const deadline = ref(false)
const deadlineAt = ref(getFormattedDate())
const engagement = ref(false)
const selectedEngagementValue = ref(engagementStore.getEngagementByValue(3))
const name = ref(null)
const description = ref(null)
const initiatedAt = ref(getFormattedDate())
const localPriority = ref(4)

onMounted(() => {
  updateLocalEventData()
})

watch([startImmediately, deadline, deadlineAt, engagement,
  selectedEngagementValue, initiatedAt, name, description, localPriority],
() => {
  updateLocalEventData()
}
)

function updateLocalEventData () {
  const updateData = {}
  updateData.status = 'pending'
  if (initiatedAt.value) {
    updateData.initiated_at = getUTCDate(initiatedAt.value)
  }

  if (name.value) {
    updateData.name = name.value
  }

  if (description.value) {
    updateData.description = description.value
  }

  if (localPriority.value) {
    updateData.priority = localPriority.value
  }

  if (startImmediately.value) {
    updateData.started_at = getUTCDate()
    updateData.status = 'in_progress'
  }

  if (deadline.value) {
    updateData.deadline_at = getUTCDate(deadlineAt.value)
  }

  if (engagement.value) {
    updateData.engagement_changes = {}
    updateData.engagement_changes.value = selectedEngagementValue.value.value
  }

  emit('updateLocalEvent', updateData)
}

function handlePriority (priority) {
  localPriority.value = priority
  updateLocalEventData()
}

</script>
