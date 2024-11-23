<template>
  <q-card class="q-ml-sm bg-grey-2" flat square :style="{ height: '73vh' }">
    <q-card-section>
      <div class="row items-center justify-between">
        <div v-if="thought" class="col-md-6 text-h6">
          {{ thought.description }}
        </div>
      </div>
      <div  v-if="thought" class="col-md-5 text-subtitle2">
        {{ thought.initiated_at }}
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>

const props = defineProps({
  thoughtId: {
    type: String,
    required: true
  }
})

import { ref, onMounted, watch } from 'vue'
import { useThoughtStore } from 'stores/thought_store'

const thought = ref(null)
const thoughtStore = useThoughtStore()

onMounted(async () => {
  thought.value = await thoughtStore.getById(props.thoughtId)
})

watch(
  () => props.thoughtId,
  (newId) => {
    thought.value = thoughtStore.getById(newId)
  },
  { immediate: true }
)
</script>
