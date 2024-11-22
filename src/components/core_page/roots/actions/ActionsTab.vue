<template>
  <div class="flex row">
    <div class="col-12 col-md-3">
      <ActionListCard @item-selected="handleSelected"/>
    </div>
    <div class="col-12 col-md-9">
      <ActionCard :actionId="id" v-if="id"/>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import ActionListCard from 'components/core_page/roots/actions/ActionListCard.vue'
import ActionCard from 'components/core_page/roots/actions/ActionCard.vue'
import { useActionStore } from 'stores/action_store'

const id = ref(null)
const actionStore = useActionStore()

function handleSelected (selectedId) {
  id.value = selectedId
}

onMounted(async () => {
  await actionStore.getForUser()
  if (actionStore.actions) {
    id.value = actionStore.actions[0].id
  }
})
</script>
