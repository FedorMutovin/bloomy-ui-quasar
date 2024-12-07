<template>
  <RootListCard
    :icon="rootTypeStore.getIconByRootName('Action')"
    resource="actions"
    :items="actionStore.actions"
    @item-selected="handleItemSelected"
  >
    <template #body="{ item }">
      <q-item-section>
        <q-item-label>{{ item.name }}</q-item-label>
        <q-item-label caption>{{ item.description }}</q-item-label>
      </q-item-section>
    </template>

    <template #form="{ close }">
      <ActionForm @close="close" />
    </template>
  </RootListCard>
</template>

<script setup>
import { useActionStore } from 'stores/action_store'
import { useRootTypeStore } from 'stores/root_type_store'
import RootListCard from 'components/RootListCard.vue'
import ActionForm from 'components/core_page/actions/ActionForm.vue'

const actionStore = useActionStore()
const rootTypeStore = useRootTypeStore()

const emit = defineEmits(['item-selected'])

function handleItemSelected (itemId) {
  emit('item-selected', itemId)
}
</script>
