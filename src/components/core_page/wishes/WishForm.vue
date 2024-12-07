<template>
  <FormCard
    @close="closeForm"
    @submit="submitForm"
    :loading="loading"
    :header="$t(`forms.wishes.create.title`)"
  >
    <template #form-fields>
      <q-card-section class="row">
        <RootsSelect
          class="col-12 col-md-7"
          :hint="$t(`forms.create.root.hint`)"
          :label="$t(`forms.create.root.label`)"
          @update:selected-root="handleSelectedRoot"
        />
      </q-card-section>

      <q-card-section class="row">
        <RootTypeSelect class="col-12 col-md-7" root-type="wish" @update:selected-root="handleSelectedType"/>
      </q-card-section>

      <q-separator spaced inset />

      <WishFields @updateLocalRoot="updateLocalRoot"/>
    </template>
  </FormCard>
</template>
<script setup>
import FormCard from 'components/FormCard.vue'
import { useWishStore } from 'stores/wish_store'
import WishFields from 'components/core_page/wishes/forms/WishFields.vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import RootsSelect from 'components/forms/RootsSelect.vue'
import RootTypeSelect from 'components/forms/RootTypeSelect.vue'
import { reactive, ref } from 'vue'

const $q = useQuasar()
const { t } = useI18n()
const wishStore = useWishStore()
const fields = ref({})
const localRootType = ref(null)
const loading = ref(false)
const localRoot = reactive({})
const emit = defineEmits(['close'])

function handleSelectedRoot (root) {
  localRoot.origin_root = root
}

function closeForm () {
  emit('close')
}

function handleSelectedType (type) {
  localRootType.value = type
  fields.value = {}
}

function updateLocalRoot (newFields) {
  fields.value = newFields
}

async function submitForm () {
  try {
    loading.value = true
    if (Object.keys(fields.value).length > 0) {
      Object.assign(localRoot, fields.value)
    }

    await wishStore.create(localRoot)
    $q.notify({
      type: 'positive',
      message: t('messages.positive'),
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
