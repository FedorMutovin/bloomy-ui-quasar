<template>
  <q-input color="accent" :model-value="date" @update:model-value="onInput">
    <template v-slot:prepend>
      <q-icon color="accent" name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date color="secondary" v-model="date" mask="YYYY-MM-DD HH:mm">
            <div class="row items-center justify-end">
              <q-btn color="accent" v-close-popup label="Close" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon color="accent" name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time color="secondary" v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
            <div class="row items-center justify-end">
              <q-btn color="accent" v-close-popup label="Close" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const date = ref(props.modelValue || new Date().toISOString().slice(0, 16).replace('T', ' '))

function onInput (value) {
  date.value = value
  emit('update:modelValue', date.value)
}

watch(date, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
