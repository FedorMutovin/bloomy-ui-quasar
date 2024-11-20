<template>
  <q-card-section>
    <div>
      <q-checkbox color="secondary" :disable="schedule" dense size="sm" v-model="startImmediately" :label="$t('forms.create.attributes.start_immediately')" />
      <q-item-label class="q-mt-sm" caption>{{ $t('forms.create.hints.start_immediately_hint') }}</q-item-label>
    </div>
    <div class="q-mt-sm">
      <q-checkbox color="secondary" dense size="sm" v-model="schedule" :label="$t('forms.create.attributes.schedule')" />
      <q-item-label class="q-mt-sm" caption>{{ $t('forms.create.hints.schedule_hint') }}</q-item-label>
    </div>
    <div class="row">
      <div class="q-mt-sm col-12 col-md-6" v-if="schedule">
        <q-item-label class="q-mt-md q-ml-sm" caption>{{ $t('attributes.schedule_at') }}</q-item-label>
        <DateTimePicker v-model="scheduledAt"/>
      </div>
    </div>
    <div class="q-mt-sm">
      <q-checkbox color="secondary" dense size="sm" v-model="deadline" :label="$t('forms.create.attributes.deadline')" />
      <q-item-label class="q-mt-sm" caption>{{ $t('forms.create.hints.deadline_hint') }}</q-item-label>
    </div>
    <div class="row">
      <div class="q-mt-sm col-12 col-md-6" v-if="deadline">
        <q-item-label class="q-mt-md q-ml-sm" caption>{{ $t('attributes.deadline_at') }}</q-item-label>
        <DateTimePicker v-model="deadlineAt"/>
      </div>
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
    <PriorityRating @update:priority="handlePriority" />
  </q-card-section>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import DateTimePicker from 'components/forms/DateTimePicker.vue'
import { getFormattedDate, getUTCDate } from 'src/utils/formattedDate'
import PriorityRating from 'components/forms/PriorityRating.vue'
import EngagementSelect from 'components/engagements/EngagementSelect.vue'
import { useEngagementStore } from 'stores/engagement_store'

const engagementStore = useEngagementStore()
const emit = defineEmits(['updateLocalEvent'])

const startImmediately = ref(true)
const schedule = ref(false)
const scheduledAt = ref(getFormattedDate())
const deadline = ref(false)
const deadlineAt = ref(getFormattedDate())
const engagement = ref(false)
const selectedEngagementValue = ref(engagementStore.getEngagementByValue(3))

onMounted(() => {
  updateLocalEventData()
})

watch([startImmediately, schedule, scheduledAt, deadline, deadlineAt, engagement, selectedEngagementValue],
  () => {
    updateLocalEventData()
  }
)

watch(schedule, (newValue) => {
  if (newValue === true) {
    startImmediately.value = false
  }
})

function updateLocalEventData () {
  const updateData = {}
  updateData.status = 'pending'

  if (startImmediately.value || schedule.value) {
    if (startImmediately.value) {
      updateData.started_at = getUTCDate()
      updateData.status = 'in_progress'
    }

    if (schedule.value) {
      updateData.schedule = {}
      updateData.schedule.scheduled_at = getUTCDate(scheduledAt.value)
      updateData.status = 'scheduled'
    }

    if (deadline.value) {
      updateData.deadline_at = getUTCDate(deadlineAt.value)
    }

    if (engagement.value) {
      updateData.engagement_changes = {}
      updateData.engagement_changes.value = selectedEngagementValue.value.value
    }
  }
  emit('updateLocalEvent', updateData)
}

function handlePriority (priority) {
  const updateData = {}
  updateData.priority = priority
  emit('updateLocalEvent', updateData)
}
</script>
