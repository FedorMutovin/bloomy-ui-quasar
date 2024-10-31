<template>
    <q-card>
      <q-expansion-item
        expand-separator
        icon="mdi-notebook-heart-outline"
        :label="$t('cards.wishes.title')"
        :caption="$t('cards.wishes.description')"
      >
        <q-item clickable v-ripple v-for="(value, key) in wishStore.wishes" :key="key">
          <q-item-section>
            <q-item-label>{{ value.title }}</q-item-label>
            <q-item-label caption>{{ value.description }}</q-item-label>
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
  <q-dialog v-model="openForm" persistent>
    <WishesForm @close="openForm = false"/>
  </q-dialog>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useWishStore } from 'stores/wish_store'
import { useUserStore } from 'stores/user_store'
import WishesForm from 'components/wishes/WishesForm.vue'

const wishStore = useWishStore()
const userStore = useUserStore()

const openForm = ref(false)

onMounted(async () => {
  await wishStore.getForUser(userStore.id)
})

</script>
