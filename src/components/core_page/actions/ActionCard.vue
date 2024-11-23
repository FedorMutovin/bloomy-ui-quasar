<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Action</div>
    </q-card-section>

    <q-separator />

    <q-card-section v-if="action">
      <div>{{ action.name }}</div>
      <div>{{ action.description }}</div>
      <div>{{ action.initiated_at }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup>
const props = defineProps({
  actionId: {
    type: String,
    required: true
  }
})

import { ref, onMounted, watch } from 'vue'
import { useActionStore } from 'stores/action_store'

const action = ref(null)
const actionStore = useActionStore()

onMounted(async () => {
  action.value = await actionStore.getById(props.actionId)
})

watch(
  () => props.actionId,
  (newId) => {
    action.value = actionStore.getById(newId)
  },
  { immediate: true }
)
</script>
