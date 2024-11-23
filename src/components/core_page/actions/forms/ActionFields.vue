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

  <q-card-section class="row">
    <DateTimePicker :label="$t('attributes.initiated_at')" v-model="initiatedAt"/>
  </q-card-section>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import DateTimePicker from 'components/forms/DateTimePicker.vue'
import { getFormattedDate, getUTCDate } from 'src/utils/formattedDate'

const emit = defineEmits(['updateLocalEvent'])
const name = ref(null)
const description = ref(null)
const initiatedAt = ref(getFormattedDate())

onMounted(() => {
  updateLocalEventData()
})

watch([name, description, initiatedAt],
  () => {
    updateLocalEventData()
  }
)

function updateLocalEventData () {
  const updateData = {}

  if (initiatedAt.value) {
    updateData.initiated_at = getUTCDate(initiatedAt.value)
  }

  if (name.value) {
    updateData.name = name.value
  }

  if (description.value) {
    updateData.description = description.value
  }

  emit('updateLocalEvent', updateData)
}
</script>
