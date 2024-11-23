<template>
  <q-card style="width: 700px; max-width: 1000px">
    <q-card-section class="row justify-between items-center">
      <div class="text-h6 col-11">{{ header }}</div>
      <q-btn padding="none" square flat round icon="mdi-close" @click="closeForm"/>
    </q-card-section>

    <q-separator/>

    <q-scroll-area :style="{ height: scrollHeight, maxWidth: '1000px' }">
      <slot name="form-fields"/>
    </q-scroll-area>

    <slot name="actions" v-if="showActions">
      <q-separator/>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat color="primary" :label="$t('buttons.cancel')" @click="closeForm" />
        <q-btn :loading="loading" push color="primary" :label="$t('buttons.save')" @click="submitForm" />
      </q-card-actions>
    </slot>
  </q-card>
</template>

<script setup>
const emit = defineEmits(['close', 'submit'])

defineProps({
  header: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  scrollHeight: {
    type: String,
    default: '500px'
  },
  showActions: {
    type: Boolean,
    default: true
  }
})

function closeForm () {
  emit('close')
}

function submitForm () {
  emit('submit')
}
</script>
