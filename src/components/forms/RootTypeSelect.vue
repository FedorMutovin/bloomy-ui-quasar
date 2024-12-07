<template>
  <q-select
    v-model="localRootType"
    color="primary"
    :readonly="rootType !== null"
    :options="rootTypeStore.rootNames"
    :label="$t('forms.create.root_type.label')"
    behavior="menu"
    stack-label
    @update:model-value="emitSelectedRoot"
    :hint="$t('forms.create.root_type.info')"
  >
    <template v-slot:selected-item="scope">
      <q-item-section avatar>
        <q-icon :name="rootTypeStore.getIconByRootName(scope.opt)" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ capitalizeFirstLetter(scope.opt) }}</q-item-label>
      </q-item-section>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="rootTypeStore.getIconByRootName(scope.opt)" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ capitalizeFirstLetter(scope.opt) }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRootTypeStore } from 'stores/root_type_store'
const rootTypeStore = useRootTypeStore()

const emit = defineEmits(['update:selected-root'])
const localRootType = ref(null)

const props = defineProps({
  rootType: {
    type: String,
    default: null
  }
})

const capitalizeFirstLetter = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function emitSelectedRoot (newRoot) {
  localRootType.value = newRoot
  emit('update:selected-root', newRoot)
}

onMounted(async () => {
  if (props.rootType) {
    const selectedRoot = rootTypeStore.root_types.find(ev => ev.name === props.rootType)
    localRootType.value = selectedRoot.name || null
  }
})
</script>
