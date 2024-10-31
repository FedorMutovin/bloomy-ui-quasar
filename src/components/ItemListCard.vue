<template>
  <q-card>
    <q-expansion-item
      expand-separator
      :icon="icon"
      :label="$t(`cards.${resource}.title`)"
      :caption="$t(`cards.${resource}.description`)"
    >
      <q-item :to="`/${resource}/${item.id}`" clickable v-ripple v-for="item in items" :key="item.id">
        <slot name="body" :item="item" />
        <q-item-section side top>
          <q-item-label caption>{{ $t('cards.priority') }}</q-item-label>
          <div class="text-secondary">
            <q-icon
              v-for="index in 5"
              :key="index"
              :name="index <= 5 - item.priority ? 'mdi-seed' : 'mdi-seed-outline'"
            />
          </div>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-card-actions>
        <q-btn class="full-width" flat color="accent" icon="mdi-plus-circle-outline" @click="openForm = true"/>
      </q-card-actions>
    </q-expansion-item>
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
