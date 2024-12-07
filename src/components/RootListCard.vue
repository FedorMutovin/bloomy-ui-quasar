<template>
  <q-card flat square class="bg-transparent">
    <q-scroll-area :style="{ height: '60vh'}">
      <q-list dense>
        <q-card class="q-ma-sm" v-for="item in items" :key="item.id">
          <q-item @click="handleClick(item.id)" clickable dense v-ripple="{ color: 'primary' }" class="q-pa-none">
            <slot name="body" :item="item" />
          </q-item>
        </q-card>
      </q-list>
    </q-scroll-area>

    <q-card-actions>
      <q-btn class="full-width" push color="primary" icon="mdi-plus-circle-outline" @click="openForm = true"/>
    </q-card-actions>
  </q-card>
  <q-dialog v-model="openForm" persistent>
    <slot name="form" :close="closeForm"></slot>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  icon: String,
  resource: String,
  items: Array
})

const emit = defineEmits(['item-selected'])

const openForm = ref(false)

function closeForm () {
  openForm.value = false
}

function handleClick (id) {
  emit('item-selected', id)
}
</script>
