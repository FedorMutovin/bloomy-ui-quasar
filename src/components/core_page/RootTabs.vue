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
      v-for="rootType in rootTypeStore.root_types"
      :key="rootType.id"
      :name="rootType.name"
      :icon="rootType.icon"
      :label="rootType.name" />
  </q-tabs>

  <q-tab-panels v-model="tab">
    <q-tab-panel v-for="rootType in rootTypeStore.root_types" :key="rootType.id" :name="rootType.name" >
      <q-card flat>
        <component :is="tabsMap[rootType.name]"/>
      </q-card>
    </q-tab-panel>
  </q-tab-panels>
</template>
<script setup >
import { onMounted, ref } from 'vue'
import { useRootTypeStore } from 'stores/root_type_store'
import WishesTab from 'components/core_page/wishes/WishesTab.vue'
import ActionsTab from 'components/core_page/actions/ActionsTab.vue'
import TasksTab from 'components/core_page/tasks/TasksTab.vue'
import GoalsTab from 'components/core_page/goals/GoalsTab.vue'
import ThoughtsTab from 'components/core_page/thoughts/ThoughtsTab.vue'
import TravelsTab from 'components/core_page/travels/TravelsTab.vue'
const rootTypeStore = useRootTypeStore()
const tab = ref(null)
const tabsMap = {
  wish: WishesTab,
  action: ActionsTab,
  task: TasksTab,
  goal: GoalsTab,
  thought: ThoughtsTab,
  travel: TravelsTab
}

onMounted(async () => {
  tab.value = 'wish'
})
</script>
