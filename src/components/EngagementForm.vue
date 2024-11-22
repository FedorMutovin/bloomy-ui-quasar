<template>
    <q-item-label caption>{{ $t('attributes.engagement') }}</q-item-label>
    <q-btn flat dense color="accent" :icon="engagementStore.getIconByValue(engagementValue)" @click="openForm = false"/>
  <q-dialog v-model="openForm" persistent transition-show="scale" transition-hide="scale">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ $t('forms.engagements.update.title') }}</div>
        <div class="text-subtitle2">{{ $t('forms.engagements.update.hint') }}</div>
      </q-card-section>

      <q-card-section>
        <EngagementSelect v-model="selectedEngagement"/>
      </q-card-section>

      <q-card-section>
        <q-input/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" :label="$t('buttons.cancel')" @click="closeForm" />
        <q-btn push color="primary" label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue'
import EngagementSelect from 'components/engagements/EngagementSelect.vue'
import { useEngagementStore } from 'stores/engagement_store'

const engagementStore = useEngagementStore()
const props = defineProps({
  engagementValue: {
    type: Number,
    default: null
  }
})

const selectedEngagement = ref(props.engagementValue)

const openForm = ref(false)
function closeForm () {
  openForm.value = false
}
</script>
