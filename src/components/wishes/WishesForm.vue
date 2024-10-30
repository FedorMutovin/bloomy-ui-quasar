<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">{{ $t("wishes.create_form_title") }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input dense :label="$t('attributes.title')" v-model="title" autofocus @keyup.enter="submitForm" />
      <q-input dense :label="$t('attributes.description')" v-model="description" @keyup.enter="submitForm" />
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat :label="$t('buttons.cancel')" @click="closeForm" />
      <q-btn flat :label="$t('buttons.save')" @click="submitForm" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useWishStore } from 'stores/wish_store'

const wishStore = useWishStore()
const emit = defineEmits(['close'])

const title = ref('')
const description = ref('')

function closeForm () {
  emit('close')
  clearForm()
}

function clearForm () {
  title.value = ''
  description.value = ''
}

async function submitForm () {
  const params = {
    title: title.value,
    description: description.value
  }
  await wishStore.createWish(params)

  clearForm()
  closeForm()
}
</script>
