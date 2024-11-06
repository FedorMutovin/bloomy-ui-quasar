<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ $t("forms.create.wishes.title") }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none row">
      <q-input clearable color="accent" :label="$t('attributes.name')" v-model="name" autofocus @keyup.enter="submitForm" class="q-ma-sm col-12" />
      <q-input clearable color="accent" autogrow :label="$t('attributes.description')" v-model="description" @keyup.enter="submitForm" class="q-ma-sm col-12" />
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
        <q-item-label class="q-mt-md q-ml-sm" caption>{{ $t('attributes.initiated_at') }}</q-item-label>
        <DateTimePicker v-model="initiatedAt" class="q-ma-sm"/>
      </div>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat color="accent" :label="$t('buttons.cancel')" @click="closeForm" />
      <q-btn :loading="loading" flat color="accent" :label="$t('buttons.save')" @click="submitForm" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWishStore } from 'stores/wish_store'
import DateTimePicker from 'components/DateTimePicker.vue'

const wishStore = useWishStore()
const emit = defineEmits(['close'])

const name = ref('')
const description = ref('')
const priority = ref(4)
const maxPriority = 5
const initiatedAt = ref('')
const loading = ref(false)
const displayPriority = computed({
  get: () => maxPriority - priority.value,
  set: (value) => {
    priority.value = maxPriority - value
  }
})

function closeForm () {
  emit('close')
}

async function submitForm () {
  loading.value = true
  const params = {
    name: name.value,
    description: description.value,
    priority: priority.value,
    initiated_at: initiatedAt.value
  }
  await wishStore.create(params)

  closeForm()
}
</script>
