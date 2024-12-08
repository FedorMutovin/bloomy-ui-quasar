<template>
  <q-card-section class="row">
    <div class="text-subtitle2 col-12">{{ $t('forms.create.root_details_header') }}</div>
    <q-input
      outlined
      clearable
      color="primary"
      autogrow
      stack-label
      :label="$t('attributes.destination')"
      v-model="destination"
      :placeholder="$t('attributes.hints.destination')"
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

  <q-card-section class="row">
    <DateTimePicker :label="$t('attributes.start_at')" v-model="startAt"/>
  </q-card-section>

  <q-card-section class="row">
    <DateTimePicker :label="$t('attributes.end_at')" v-model="endAt"/>
  </q-card-section>

  <q-separator spaced inset />

  <q-card-section class="row">
    <DateTimePicker :label="$t('attributes.initiated_at')" v-model="initiatedAt"/>
  </q-card-section>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import DateTimePicker from 'components/forms/DateTimePicker.vue'
import { getFormattedDate, getUTCDate } from 'src/utils/formattedDate'

const emit = defineEmits(['updateLocalRoot'])
const description = ref(null)
const destination = ref(null)
const initiatedAt = ref(getFormattedDate())
const startAt = ref(getFormattedDate())
const endAt = ref(getFormattedDate())

onMounted(() => {
  updateLocalRootData()
})

watch([destination, description, initiatedAt, startAt, endAt],
  () => {
    updateLocalRootData()
  }
)

function updateLocalRootData () {
  const updateData = {}

  if (initiatedAt.value) {
    updateData.initiated_at = getUTCDate(initiatedAt.value)
  }

  if (startAt.value) {
    updateData.start_at = getUTCDate(startAt.value)
  }

  if (endAt.value) {
    updateData.end_at = getUTCDate(endAt.value)
  }

  if (destination.value) {
    updateData.destination = destination.value
  }

  if (description.value) {
    updateData.description = description.value
  }

  emit('updateLocalRoot', updateData)
}
</script>
