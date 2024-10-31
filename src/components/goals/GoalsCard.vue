<template>
  <q-card>
    <q-expansion-item
      expand-separator
      icon="mdi-sprout-outline"
      :label="$t('cards.goals.title')"
      :caption="$t('cards.goals.description')"
    >
      <q-item :to="`/goals/${value.id}`" exact clickable v-ripple v-for="(value, key) in goalStore.goals" :key="key">
        <q-item-section>
          <q-item-label>{{ value.name }}</q-item-label>
          <q-item-label caption>{{ $t(`statuses.${value.status}`)}}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>{{ $t('cards.priority') }}</q-item-label>
          <div class="text-secondary">
            <q-icon
              v-for="index in 5"
              :key="index"
              :name="index <= 5 - value.priority ? 'mdi-seed' : 'mdi-seed-outline'"
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
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useGoalStore } from 'stores/goal_store'
import { useUserStore } from 'stores/user_store'

const goalStore = useGoalStore()
const userStore = useUserStore()

const openForm = ref(false)

onMounted(async () => {
  await goalStore.getForUser(userStore.id)
})

</script>
