<template>
  <q-card class="q-ml-sm bg-grey-2" flat square :style="{ height: '73vh' }">
    <q-card-section>
      <div class="row items-center justify-between">
        <div v-if="wish" class="col-md-6 text-h6">
          {{ wish.name }}
        </div>
        <q-rating
          v-model="displayPriority"
          size="md"
          color="secondary"
          icon="mdi-leaf-circle-outline"
          icon-selected="mdi-leaf-circle"
          class="q-pa-sm col-md-6"
          readonly
          v-if="wish"
        />
      </div>
      <div  v-if="wish" class="col-md-5 text-subtitle2">
        {{ wish.initiated_at }}
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div  v-if="wish" class="col-md-5 text-subtitle2">
        {{ wish.description }}
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn @click="openEventForm = true" push color="primary" :label="$t('forms.wishes.activate.buttons.action')" class="q-ma-sm" />
    </q-card-actions>
  </q-card>
  <q-dialog v-model="openEventForm" persistent>
    <EventForm @close="openEventForm = false" :header="$t(`forms.wishes.activate.header`)" :trigger-id="wish.id"/>
  </q-dialog>
</template>
<script setup>

const props = defineProps({
  wishId: {
    type: String,
    required: true
  }
})

import { ref, onMounted, computed, watch } from 'vue'
import { useWishStore } from 'stores/wish_store'
import EventForm from 'components/EventForm.vue'

const wish = ref(null)
const wishStore = useWishStore()
const maxPriority = 5
const openEventForm = ref(false)
const displayPriority = computed({
  get () {
    if (wish.value) {
      return maxPriority - wish.value.priority
    }
    return 0
  },
  set (value) {
    if (wish.value) {
      wish.value.priority = maxPriority - value
    }
  }
})

onMounted(async () => {
  wish.value = await wishStore.getById(props.wishId)
})

watch(
  () => props.wishId,
  (newId) => {
    wish.value = wishStore.getById(newId)
  },
  { immediate: true }
)
</script>
