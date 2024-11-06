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
      <q-btn @click="openGoalForm = true" color="accent" :label="$t('buttons.make_it_goal')" class="q-ma-sm" />
    </q-card>
    <q-dialog v-model="openGoalForm" persistent>
      <GoalForm @close="openGoalForm = false" :event-relation="eventRelation" :description="wish.description" :name="wish.name" :priority="wish.priority"  />
    </q-dialog>
  </div>
</template>
<script setup>

import GoalForm from 'components/goals/GoalForm.vue'

const props = defineProps({
  wishId: {
    type: String,
    required: true
  }
})

import { ref, onBeforeMount, computed } from 'vue'
import { useWishStore } from 'stores/wish_store'

const wish = ref(null)
const wishStore = useWishStore()
const maxPriority = 5
// const loading = ref(false)
const openGoalForm = ref(false)
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

const eventRelation = computed(() => {
  if (wish.value) {
    return {
      type: 'Wish',
      name: wish.value.name
    }
  }
  return null
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
