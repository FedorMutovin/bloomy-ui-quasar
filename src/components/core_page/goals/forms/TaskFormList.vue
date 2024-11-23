<template>
  <q-expansion-item
    expand-separator
    class="col-12"
    default-opened
    icon="perm_identity"
    header-class="text-primary"
  >
    <template v-slot:header>
      <q-item-section class="text-subtitle1 text-black">
        <div class="row items-center justify-start">
          <div>
            {{ $t('forms.create.goals.action_steps') }}
          </div>
          <q-icon class="q-ma-sm" size="sm" name="mdi-help-circle-outline" color="primary" >
            <q-tooltip class="bg-primary text-body2" anchor="top middle" self="center middle">
              {{ $t('forms.create.goals.action_steps_tip') }}
            </q-tooltip>
          </q-icon>
        </div>
      </q-item-section>
      <q-item-section side>
        <q-chip color="secondary" text-color="white" icon="mdi-notebook-heart-outline">
          {{ tasks.length }}
        </q-chip>
      </q-item-section>
    </template>
    <q-card-section class="row">
      <FormCard
        :header="$t(`forms.create.tasks.title`)"
        v-for="(_, index) in tasks"
        :key="index"
        v-model="tasks[index]"
        class="q-mt-md col-12"
        :with-root="false"
        @update:modelValue="updateTask(index, $event)"
      >
        <template #actions>
          <q-btn flat color="primary" :label="$t('buttons.remove')" @click="removeTask(index)" />
        </template>
      </FormCard>
      <q-btn class="q-mt-md" size="md" color="primary" :label="$t('forms.create.goals.add_task')" @click="addTask"  />
    </q-card-section>
  </q-expansion-item>
</template>
<script setup>
import { ref } from 'vue'
import { getFormattedDate } from 'src/utils/formattedDate'
import FormCard from 'components/FormCard.vue'

const emit = defineEmits(['update:tasks'])
const tasks = ref([])

function addTask () {
  tasks.value.push({
    name: '',
    description: '',
    priority: 4,
    initiated_at: getFormattedDate()
  })
  emit('update:tasks', tasks.value)
}

function removeTask (index) {
  tasks.value.splice(index, 1)
  emit('update:tasks', tasks.value)
}

function updateTask (index, updatedTask) {
  tasks.value[index] = updatedTask
  emit('update:tasks', tasks.value)
}
</script>
