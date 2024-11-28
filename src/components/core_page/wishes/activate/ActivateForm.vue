<template>
 <FormCard
   @close="closeForm"
   @submit="submitForm"
   :loading="loading"
   :header="$t(`forms.wishes.activate.header`)"
   :show-actions="localEventType != null"
   :scroll-height="localEventType != null ? '500px' : '250px'"
 >
   <template #form-fields>
     <q-card-section class="row">
       <RootsSelect
         class="col-12 col-md-7"
         :root-id="rootId"
         :hint="$t(`forms.create.root.hint`)"
         :label="$t(`forms.create.root.label`)"
         @update:selected-root="handleSelectedRoot"
       />
     </q-card-section>

     <q-card-section class="row">
       <EventTypeSelect class="col-12 col-md-7" @update:selected-event="handleSelectedType"/>
     </q-card-section>

     <div v-if="localEventType">
       <q-separator spaced inset />

       <component
         :is="formFieldsComponentMap[localEventType]"
         @updateLocalEvent="updateLocalEvent"
       />
     </div>
   </template>
 </FormCard>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import FormCard from 'components/FormCard.vue'
import RootsSelect from 'components/forms/RootsSelect.vue'
import EventTypeSelect from 'components/forms/EventTypeSelect.vue'
import GoalFields from 'components/core_page/goals/forms/GoalFields.vue'
import TaskFields from 'components/core_page/tasks/forms/TaskFields.vue'
import { useTaskStore } from 'stores/task_store'
import { useGoalStore } from 'stores/goal_store'
import { useActionStore } from 'stores/action_store'
import { useWishStore } from 'stores/wish_store'
import { useThoughtStore } from 'stores/thought_store'
import { useI18n } from 'vue-i18n'
import WishFields from 'components/core_page/wishes/forms/WishFields.vue'
import ActionFields from 'components/core_page/actions/forms/ActionFields.vue'
import ThoughtFields from 'components/core_page/thoughts/forms/ThoughtFields.vue'

defineProps({
  rootId: {
    type: String,
    default: null
  }
})

const $q = useQuasar()
const { t } = useI18n()
const taskStore = useTaskStore()
const goalStore = useGoalStore()
const actionStore = useActionStore()
const wishStore = useWishStore()
const thoughtStore = useThoughtStore()
const emit = defineEmits(['close'])

const formStoresMap = {
  task: taskStore,
  goal: goalStore,
  action: actionStore,
  wish: wishStore,
  thought: thoughtStore
}

const formFieldsComponentMap = {
  task: TaskFields,
  goal: GoalFields,
  wish: WishFields,
  action: ActionFields,
  thought: ThoughtFields
}

const fields = ref({})
const localEventType = ref(null)
const loading = ref(false)
const localRoot = reactive({})

function handleSelectedRoot (root) {
  localRoot.trigger = root
}

function handleSelectedType (type) {
  localEventType.value = type
  fields.value = {}
}

function updateLocalEvent (newFields) {
  fields.value = newFields
}

function closeForm () {
  emit('close')
}

async function submitForm () {
  try {
    loading.value = true
    if (Object.keys(fields.value).length > 0) {
      Object.assign(localRoot, fields.value)
    }

    const store = formStoresMap[localEventType.value]

    await store.create(localRoot)
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
