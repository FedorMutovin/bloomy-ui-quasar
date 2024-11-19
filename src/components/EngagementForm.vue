<template>
    <q-item-label caption>{{ $t('attributes.engagement') }}</q-item-label>
    <q-btn flat dense :icon="engagementStore.getIconByValue(engagementValue)" @click="openForm = false"/>
  <q-dialog v-model="openForm" persistent transition-show="scale" transition-hide="scale">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ $t('forms.engagements.update.title') }}</div>
        <div class="text-subtitle2">{{ $t('forms.engagements.update.hint') }}</div>
      </q-card-section>

      <q-card-section>
        <q-select
          filled
          v-model="engagement"
          :options="engagementStore.engagements"
          label="Standard"
          color="teal"
          clearable
          options-selected-class="text-deep-orange"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>

      <q-card-section>
        <q-input/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" :label="$t('buttons.cancel')" @click="closeForm" />
        <q-btn push color="blue-8" label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { useEngagementStore } from 'stores/engagement_store'

const engagementStore = useEngagementStore()

const props = defineProps({
  engagementValue: {
    type: Number,
    default: null
  }
})

const openForm = ref(false)
const engagement = ref(props.engagementValue)
function closeForm () {
  openForm.value = false
}
</script>
