<template>
  <div class="flex justify-center column">
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-if="goal" filled v-model="goal.name" hint="Readonly" label="Name" readonly/>
      </div>
      <div class="col-6">
        <q-input v-if="goal" filled v-model="goal.status" hint="Readonly" label="Status" readonly/>
      </div>
      <div class="col-6">
        <q-input v-if="goal" filled v-model="goal.started_at" hint="Readonly" label="Started" readonly/>
      </div>
    </div>
    <q-card-actions>
      <q-btn @click="handleUniteAction(goal)" push color="primary" :label="$t('forms.actions.unite.button')" class="q-ma-sm" />
    </q-card-actions>
    <q-dialog v-model="openUniteForm" persistent>
      <UniteForm :root-id="goal.id" root-type="goal" @close="openUniteForm = false"  />
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useGoalStore } from 'stores/goal_store'
import UniteForm from 'components/core_page/unite/UniteForm.vue'

const props = defineProps({
  goalId: {
    type: String,
    required: true
  }
})

const goal = ref(null)
const goalStore = useGoalStore()
const openUniteForm = ref(false)

function handleUniteAction (itemId) {
  openUniteForm.value = true
}

onMounted(async () => {
  goal.value = await goalStore.getById(props.goalId)
})

watch(
  () => props.goalId,
  (newId) => {
    goal.value = goalStore.getById(newId)
  },
  { immediate: true }
)

</script>
