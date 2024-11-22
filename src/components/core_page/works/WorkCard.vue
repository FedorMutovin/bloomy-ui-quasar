<template>
  <q-card class="q-ma-sm" >
    <div v-if="workStore.works && workStore.works.length > 0">
      <q-item v-for="work in workStore.works"
              :key="work.id"
              :name="work.company_name" >
        <q-item-section avatar>
          <q-icon color="primary" name="local_bar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ work.position_name }}</q-item-label>
          <q-item-label caption>{{ work.company_name }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <q-btn v-else class="full-width" flat color="primary" icon="mdi-plus-circle-outline"/>
  </q-card>
</template>
<script setup>
import { onBeforeMount } from 'vue'
import { useWorkStore } from 'stores/work_store'

const workStore = useWorkStore()

onBeforeMount(async () => {
  await workStore.getCurrent()
})
</script>
