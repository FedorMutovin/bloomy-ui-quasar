<template>
  <FormCard
    @close="closeForm"
    @submit="submitForm"
    :loading="loading"
    :header="$t(`forms.unite.title`)"
    scroll-height="350px"
  >
    <template #form-fields>
      <q-card-section class="row">
        <RootsSelect
          class="col-12 col-md-7"
          :root-id="rootId"
          :hint="$t(`forms.unite.source.hint`)"
          :label="$t(`forms.unite.source.label`)"
          @update:selected-root="handleSourceRoot"
        />
      </q-card-section>

      <q-card-section class="row">
        <RootsSelect
          class="col-12 col-md-7"
          :hint="$t(`forms.unite.target.hint`)"
          :label="$t(`forms.unite.target.label`)"
          @update:selected-root="handleTargetRoot"
          :filter-by="defaultFilter"
        />
      </q-card-section>
      <q-card-section>
        <q-input
          outlined
          clearable
          color="primary"
          autogrow
          stack-label
          :label="$t('attributes.reason')"
          v-model="reason"
          :placeholder="$t('attributes.hints.reason')"
          class="q-mt-md col-12"
        />
      </q-card-section>
    </template>

    <template #actions>
      <q-separator/>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat color="primary" :label="$t('buttons.cancel')" @click="closeForm" />
        <q-btn :loading="loading" push color="primary" :label="$t('forms.unite.action')" @click="submitForm" />
      </q-card-actions>
    </template>
  </FormCard>
</template>
<script setup>
import FormCard from 'components/FormCard.vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import RootsSelect from 'components/forms/RootsSelect.vue'
import { ref } from 'vue'
import { useRootStore } from 'stores/root_store'

const props = defineProps({
  rootId: {
    type: String,
    required: true
  },
  rootType: {
    type: String,
    required: true
  }
})
const rootStore = useRootStore()
const $q = useQuasar()
const { t } = useI18n()
const loading = ref(false)
const sourceRoot = ref(null)
const targetRoot = ref(null)
const reason = ref(null)
const emit = defineEmits(['close'])
const defaultFilter = {
  root_type: props.rootType
}

function handleSourceRoot (root) {
  sourceRoot.value = root
}

function handleTargetRoot (root) {
  targetRoot.value = root
}

function closeForm () {
  emit('close')
}

async function submitForm () {
  try {
    loading.value = true
    const data = {
      source: sourceRoot.value,
      target: targetRoot.value,
      reason: reason.value
    }

    await rootStore.unite(data)
    $q.notify({
      type: 'positive',
      message: t('messages.unite.positive'),
      position: 'top',
      actions: [
        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
      ]
    })
    closeForm()
  } catch (errors) {
    const message = Object.entries(errors.response.data.errors)
      .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
      .join('; ')
    $q.notify({
      type: 'negative',
      position: 'top',
      message,
      actions: [
        { icon: 'close', color: 'white', round: true }
      ]
    })
  } finally {
    loading.value = false
  }
}
</script>
