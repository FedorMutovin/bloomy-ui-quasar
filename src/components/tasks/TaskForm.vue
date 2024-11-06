<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ $t("forms.create.tasks.title") }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none row">
      <q-input clearable color="accent" :label="$t('attributes.name')" v-model="task.name" autofocus @keyup.enter="submitForm" class="q-ma-sm col-12" />
      <q-input clearable color="accent" autogrow :label="$t('attributes.description')" v-model="task.description" @keyup.enter="submitForm" class="q-ma-sm col-12" />
      <div class="col-12 col-md-6">
        <q-item-label class="q-mt-md q-ml-sm" caption>{{ $t('attributes.priority') }}</q-item-label>
        <q-rating
          v-model="displayPriority"
          size="md"
          color="secondary"
          icon="mdi-leaf-circle-outline"
          icon-selected="mdi-leaf-circle"
          class="q-ma-sm"
        />
      </div>
      <div class="col-12 col-md-6">
        <div class="row">
          <q-toggle class="col-6" v-model="backdate" :label="$t('forms.create.backdate')" color="secondary" />
          <q-icon class="col-2" size="sm" name="mdi-help-circle-outline" color="accent" >
            <q-tooltip class="bg-accent text-body2" anchor="top middle" self="center middle">
              {{ $t('forms.create.backdate_tip') }}
            </q-tooltip>
          </q-icon>
        </div>
        <div v-if="backdate">
          <q-item-label class="q-mt-md q-ml-sm" caption>{{ $t('attributes.initiated_at') }}</q-item-label>
          <DateTimePicker v-model="task.initiated_at" class="q-ma-sm"/>
        </div>
      </div>
    </q-card-section>

    <q-card-actions v-if="withActions" align="right" class="text-primary">
      <q-btn flat color="accent" :label="$t('buttons.cancel')" @click="closeForm" />
      <q-btn :loading="loading" flat color="accent" :label="$t('buttons.save')" @click="submitForm" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useTaskStore } from 'stores/task_store'
import DateTimePicker from 'components/DateTimePicker.vue'

const taskStore = useTaskStore()

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      name: '',
      description: '',
      priority: 4,
      initiated_at: new Date().toISOString().slice(0, 16).replace('T', ' ')
    })
  },
  withActions: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const task = ref({ ...props.modelValue })
watch(task, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

const maxPriority = 5
const loading = ref(false)
const backdate = ref(false)
const displayPriority = computed({
  get: () => maxPriority - task.value.priority,
  set: (value) => {
    task.value.priority = maxPriority - value
  }
})
watch(backdate, (newVal) => {
  if (newVal) {
    task.value.initiated_at = new Date().toISOString().slice(0, 16).replace('T', ' ')
  }
})

function closeForm () {
  emit('close')
}

async function submitForm () {
  loading.value = true
  await taskStore.create(task)

  closeForm()
}
</script>
