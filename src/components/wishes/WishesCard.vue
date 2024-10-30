<template>
    <q-card>
      <q-expansion-item
        expand-separator
        icon="mdi-book-heart-outline"
        :label="$t('cards.wishes.title')"
        :caption="$t('cards.wishes.description')"
      >
        <q-item clickable v-ripple v-for="(value, key) in wishStore.wishes" :key="key">
          <q-item-section>
            <q-item-label>{{ value.title }}</q-item-label>
            <q-item-label caption>{{ value.description }}</q-item-label>
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
