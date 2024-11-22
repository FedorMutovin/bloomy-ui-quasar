<template>
  <div class="flex row">
    <div class="col-12 col-md-3">
      <WishListCard @item-selected="handleWishSelected"/>
    </div>
    <div class="col-12 col-md-9">
      <WishCard :wishId="wishId" v-if="wishId"/>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import WishListCard from 'components/core_page/roots/wishes/WishListCard.vue'
import WishCard from 'components/core_page/roots/wishes/WishCard.vue'
import { useWishStore } from 'stores/wish_store'

const wishId = ref(null)
const wishStore = useWishStore()

function handleWishSelected (selectedId) {
  wishId.value = selectedId
}

onMounted(async () => {
  await wishStore.getForUser()
  if (wishStore.wishes) {
    wishId.value = wishStore.wishes[0].id
  }
})
</script>
