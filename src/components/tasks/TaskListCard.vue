<template>
  <q-card>
    <q-expansion-item
      expand-separator
      icon="mdi-clipboard-text-outline"
      :label="$t('cards.tasks.title')"
      :caption="$t('cards.tasks.description')"
    >
      <q-item :to="`/tasks/${value.id}`" exact clickable v-ripple v-for="(value, key) in taskStore.tasks" :key="key">
        <q-item-section>
          <q-item-label>{{ value.name }}</q-item-label>
          <q-item-label caption>{{ value.description }}</q-item-label>
          <q-item-label caption>{{ $t(`statuses.${value.status}`)}}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2 min ago</q-item-label>
          <div class="text-orange">
            <q-icon name="mdi-star-outline" />
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-card-actions>
        <q-btn class="full-width" flat icon="mdi-plus-circle-outline" @click="openForm = true"/>
      </q-card-actions>
    </q-expansion-item>
  </q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useTaskStore } from 'stores/task_store'
import { useUserStore } from 'stores/user_store'

const taskStore = useTaskStore()
const userStore = useUserStore()

const openForm = ref(false)

onMounted(async () => {
  await taskStore.getForUser(userStore.id)
})

</script>
