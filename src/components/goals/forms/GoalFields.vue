<template>
  <q-card-section>
    <div>
      <q-checkbox color="secondary" dense size="sm" v-model="startImmediately" :label="$t('forms.create.attributes.start_immediately')" />
      <q-item-label class="q-mt-sm" caption>{{ $t('forms.create.hints.start_immediately_hint') }}</q-item-label>
    </div>
  </q-card-section>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { getUTCDate } from 'src/utils/formattedDate'
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

</script>
