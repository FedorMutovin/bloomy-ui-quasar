<template>
  <q-card class="q-ml-sm bg-grey-2" flat square :style="{ height: '73vh' }">
    <q-card-section>
      <div class="row items-center justify-between">
        <div v-if="travel" class="col-md-6 text-h6">
          {{ travel.destination }}
        </div>
      </div>
      <div  v-if="travel" class="col-md-5 text-subtitle2">
        {{ travel.initiated_at }}
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>

const props = defineProps({
  travelId: {
    type: String,
    required: true
  }
})

import { ref, onMounted, watch } from 'vue'
import { useTravelStore } from 'stores/travel_store'

const travel = ref(null)
const travelStore = useTravelStore()

onMounted(async () => {
  travel.value = await travelStore.getById(props.travelId)
})

watch(
  () => props.travelId,
  (newId) => {
    travel.value = travelStore.getById(newId)
  },
  { immediate: true }
)
</script>
