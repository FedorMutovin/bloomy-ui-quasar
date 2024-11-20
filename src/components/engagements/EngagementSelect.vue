<template>
  <q-select
    filled
    v-model="localValue"
    :options="engagementStore.engagements"
    :label="$t('attributes.engagements.value')"
    color="primary"
    stack-label
    options-selected-class="text-deep-8"
  >
    <template v-slot:selected-item="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="scope.opt.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.name }}</q-item-label>
          <q-item-label caption>{{ scope.opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="scope.opt.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.name }}</q-item-label>
          <q-item-label caption>{{ scope.opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useEngagementStore } from 'stores/engagement_store'

const engagementStore = useEngagementStore()
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
