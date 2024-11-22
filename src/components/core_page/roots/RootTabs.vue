<template>
  <q-tabs
    v-model="tab"
    inline-label
    dense
    active-color="primary"
    class="text-grey-8"
    align="center"
  >
    <q-tab
      v-for="eventType in eventTypeStore.event_types"
      :key="eventType.id"
      :name="eventType.name"
      :icon="eventType.icon"
      :label="eventType.name" />
  </q-tabs>

  <q-separator/>

  <q-tab-panels v-model="tab">
    <q-tab-panel v-for="eventType in eventTypeStore.event_types" :key="eventType.id" :name="eventType.name" >
      <component :is="tabsMap[eventType.name]"/>
    </q-tab-panel>
  </q-tab-panels>
</template>
<script setup >
import { onMounted, ref } from 'vue'
import { useEventTypeStore } from 'stores/event_type_store'
import WishesTab from 'components/core_page/roots/wishes/WishesTab.vue'
import ActionsTab from 'components/core_page/roots/actions/ActionsTab.vue'
import TasksTab from 'components/core_page/roots/tasks/TasksTab.vue'
import GoalsTab from 'components/core_page/roots/goals/GoalsTab.vue'
import ThoughtsTab from 'components/core_page/roots/thoughts/ThoughtsTab.vue'
const eventTypeStore = useEventTypeStore()
const tab = ref(null)
const tabsMap = {
  wish: WishesTab,
  action: ActionsTab,
  task: TasksTab,
  goal: GoalsTab,
  thought: ThoughtsTab
}

onMounted(async () => {
  tab.value = 'wish'
})
</script>
