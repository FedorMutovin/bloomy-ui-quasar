<template>
  <q-card-section>
    <div>
      <q-checkbox color="secondary" dense size="sm" v-model="startImmediately" :label="$t('forms.create.attributes.start_immediately')" />
      <q-item-label class="q-mt-sm" caption>{{ $t('forms.create.hints.start_immediately_hint') }}</q-item-label>
    </div>
    <div class="col-12 q-mt-md">
      <PriorityRating @update:priority="handlePriority" />
    </div>
  </q-card-section>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { getUTCDate } from 'src/utils/formattedDate'
import PriorityRating from 'components/forms/PriorityRating.vue'
defineProps({
  labelEvent: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['updateLocalEvent'])

const startImmediately = ref(true)

onMounted(() => {
  updateLocalEventData()
})

watch([startImmediately], () => {
  updateLocalEventData()
})

function updateLocalEventData () {
  const updateData = {}

  if (startImmediately.value) {
    updateData.started_at = getUTCDate()
    updateData.status = 'in_progress'
  }

  emit('updateLocalEvent', updateData)
}

function handlePriority (priority) {
  const updateData = {}
  updateData.priority = priority
  emit('updateLocalEvent', updateData)
}

</script>
