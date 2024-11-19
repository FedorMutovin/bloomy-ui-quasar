<template>
  <q-card-section>
    <div>
      <q-checkbox color="secondary" dense size="sm" v-model="startImmediately" :label="$t('forms.create.attributes.start_immediately')" />
      <q-item-label class="q-mt-sm" caption>{{ $t('forms.create.hints.start_immediately_hint') }}</q-item-label>
    </div>
    <div class="q-mt-sm" v-if="!startImmediately">
      <q-checkbox color="secondary" hint="loh" dense size="sm" v-model="schedule" :label="$t('forms.create.attributes.schedule')" />
      <q-item-label class="q-mt-sm" caption>{{ $t('forms.create.hints.schedule_hint') }}</q-item-label>
    </div>
    <div class="row">
      <div class="q-mt-sm col-12 col-md-6" v-if="schedule">
        <q-item-label class="q-mt-md q-ml-sm" caption>{{ $t('attributes.schedule_at') }}</q-item-label>
        <DateTimePicker v-model="scheduledAt"/>
      </div>
    </div>
    <div class="col-12 q-mt-md">
      <PriorityRating @update:priority="handlePriority" />
    </div>
  </q-card-section>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import DateTimePicker from 'components/forms/DateTimePicker.vue'
import { getFormattedDate, getUTCDate } from 'src/utils/formattedDate'
import PriorityRating from 'components/forms/PriorityRating.vue'

const emit = defineEmits(['updateLocalEvent'])

const startImmediately = ref(true)
const schedule = ref(false)
const scheduledAt = ref(getFormattedDate())

onMounted(() => {
  updateLocalEventData()
})

watch([startImmediately, schedule, scheduledAt], () => {
  updateLocalEventData()
})

function updateLocalEventData () {
  const updateData = {}

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
  }

  emit('updateLocalEvent', updateData)
}

function handlePriority (priority) {
  const updateData = {}
  updateData.priority = priority
  emit('updateLocalEvent', updateData)
}
</script>
