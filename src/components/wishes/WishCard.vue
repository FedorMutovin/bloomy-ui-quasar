<template>
  <q-card>
    <div class="flex justify-center column">
      <div class="row justify-center">
        <div class="col-12">
          <q-input v-if="wish" filled v-model="wish.title" hint="Readonly" :label="$t('attributes.title')" readonly/>
        </div>
        <div class="col-12">
          <q-input v-if="wish" autogrow filled v-model="wish.description" hint="Readonly" :label="$t('attributes.description')" readonly/>
        </div>
      </div>
    </div>
  </q-card>
</template>
<script setup>
const props = defineProps({
  wishId: {
    type: String,
    required: true
  }
})

import { ref, onBeforeMount } from 'vue'
import { useWishStore } from 'stores/wish_store'

const wish = ref(null)
const wishStore = useWishStore()

onBeforeMount(async () => {
  wish.value = await wishStore.findById(props.wishId)
})
</script>
