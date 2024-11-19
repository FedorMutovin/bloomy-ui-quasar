<template>
  <q-card square flat bordered>
    <q-item>
      <q-item-section>
        <div class="flex row items-center justify-center">
          <q-icon :name="icon" size="sm" class="col-6"/>
          <q-item-label class="col-6 text-subtitle1">{{ $t(`cards.${resource}.title`) }}</q-item-label>
        </div>
      </q-item-section>
    </q-item>

    <q-separator/>

    <q-scroll-area :style="{ height: '60vh'}">
      <q-list separator>
        <q-item :to="`/core/${resource}/${item.id}`" clickable v-ripple v-for="item in items" :key="item.id">
          <slot name="body" :item="item" />
        </q-item>

        <q-separator />
      </q-list>
    </q-scroll-area>

    <q-separator />

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

const openForm = ref(false)

function closeForm () {
  openForm.value = false
}
</script>
