<template>
  <div class="flex justify-center q-ma-md">
    <q-card class="my-card">
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
      <q-btn @click="openEventForm = true" color="accent" :label="$t('forms.wishes.activate.buttons.action')" class="q-ma-sm" />
    </q-card>
    <q-dialog v-model="openEventForm" persistent>
      <EventForm @close="openEventForm = false" :header="$t(`forms.wishes.activate.header`)" :trigger-id="wish.id"/>
    </q-dialog>
  </div>
</template>
<script setup>

const props = defineProps({
  wishId: {
    type: String,
    required: true
  }
})

import { ref, onBeforeMount, computed } from 'vue'
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

onBeforeMount(async () => {
  wish.value = await wishStore.findById(props.wishId)
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 1000px
</style>
