<template>
  <div class="col-12 q-mt-md">
    <q-item-label caption class="text-black">{{ $t('attributes.priority') }}</q-item-label>
    <q-rating
      v-model="localDisplayPriority"
      size="md"
      color="secondary"
      icon="mdi-leaf-circle-outline"
      icon-selected="mdi-leaf-circle"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const maxPriority = 5
const priority = ref(0)

const emit = defineEmits(['update:priority'])

const localDisplayPriority = computed({
  get: () => maxPriority - priority.value,
  set: (value) => {
    priority.value = maxPriority - value
    emit('update:priority', priority.value)
  }
})
</script>
