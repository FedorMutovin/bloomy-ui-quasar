<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ $t("forms.create.goals.title") }}</div>
    </q-card-section>

    <q-card-section>
      <EventRelationSelect @update:selected-event="handleSelectedEvent"/>
    </q-card-section>

    <q-card-section class="q-pt-none row">
      <q-input clearable color="accent" :label="$t('attributes.name')" v-model="goal.name" autofocus @keyup.enter="submitForm" class="q-ma-sm col-12" />
      <q-input clearable color="accent" autogrow :label="$t('attributes.description')" v-model="goal.description" @keyup.enter="submitForm" class="q-ma-sm col-12" />
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
          <q-toggle class="col-6 col-md-5" v-model="backdate" :label="$t('forms.create.backdate')" color="secondary" />
          <q-icon class="col-2" size="sm" name="mdi-help-circle-outline" color="accent" >
            <q-tooltip class="bg-accent text-body2" anchor="top middle" self="center middle">
              {{ $t('forms.create.backdate_tip') }}
            </q-tooltip>
          </q-icon>
        </div>
        <div v-if="backdate">
          <q-item-label class="q-mt-md q-ml-sm" caption>{{ $t('attributes.initiated_at') }}</q-item-label>
          <DateTimePicker v-model="goal.initiated_at" class="q-ma-sm"/>
        </div>
      </div>

      <q-expansion-item
        expand-separator
        class="col-12"
        default-opened
        icon="perm_identity"
        header-class="text-accent"
      >
        <template v-slot:header>
          <q-item-section class="text-subtitle1 text-black">
            <div class="row items-center justify-start">
              <div>
                {{ $t('forms.create.goals.action_steps') }}
              </div>
              <q-icon class="q-ma-sm" size="sm" name="mdi-help-circle-outline" color="accent" >
                <q-tooltip class="bg-accent text-body2" anchor="top middle" self="center middle">
                  {{ $t('forms.create.goals.action_steps_tip') }}
                </q-tooltip>
              </q-icon>
            </div>
          </q-item-section>
          <q-item-section side>
            <q-chip color="secondary" text-color="white" icon="mdi-notebook-heart-outline">
              {{ goal.tasks_attributes.length }}
            </q-chip>
          </q-item-section>
        </template>
        <q-card-section>
          <TaskForm
            v-for="(_, index) in goal.tasks_attributes"
            :key="index"
            v-model="goal.tasks_attributes[index]"
            class="q-mt-md"
            :with-actions="false"
          />
          <q-btn class="q-mt-md" size="md" color="accent" :label="$t('forms.create.goals.add_task')" @click="addTask"  />
        </q-card-section>
      </q-expansion-item>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat color="accent" :label="$t('buttons.cancel')" @click="closeForm" />
      <q-btn :loading="loading" flat color="accent" :label="$t('buttons.save')" @click="submitForm" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { useGoalStore } from 'stores/goal_store'
import DateTimePicker from 'components/DateTimePicker.vue'
import TaskForm from 'components/tasks/TaskForm.vue'
import EventRelationSelect from 'components/EventRelationSelect.vue'

const goalStore = useGoalStore()
const emit = defineEmits(['close'])

const props = defineProps({
  name: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  priority: {
    type: Number,
    default: 4
  },
  initiated_at: {
    type: Date,
    default: new Date().toISOString().slice(0, 16).replace('T', ' ')
  },
  eventRelation: {
    type: Object,
    default: () => ({
      name: null,
      type: null
    })
  }
})

const goal = reactive({
  name: props.name,
  description: props.description,
  priority: props.priority,
  initiated_at: props.initiated_at,
  tasks_attributes: [],
  triggers_attributes: []
})

function addTask () {
  goal.tasks_attributes.push({
    name: '',
    description: '',
    priority: 4,
    initiated_at: new Date().toISOString().slice(0, 16).replace('T', ' ')
  })
}

function handleSelectedEvent (event) {
  goal.triggers_attributes = []
  goal.triggers_attributes.push(event)
}

const maxPriority = 5
const loading = ref(false)
const backdate = ref(false)
const displayPriority = computed({
  get: () => maxPriority - goal.priority,
  set: (value) => {
    goal.priority = maxPriority - value
  }
})

watch(backdate, (newVal) => {
  if (newVal) {
    goal.initiated_at = new Date().toISOString().slice(0, 16).replace('T', ' ')
  }
})

function closeForm () {
  emit('close')
}

async function submitForm () {
  loading.value = true
  await goalStore.create(goal)

  closeForm()
}
</script>
