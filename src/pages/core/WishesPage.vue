<template>
  <div class="flex row">
    <div class="col-12 col-md-3">
      <WishListCard/>
    </div>
    <div class="col-12 col-md-8">
      <router-view/>
    </div>
  </div>
</template>
<script setup>
import WishListCard from 'components/wishes/WishListCard.vue'
</script>
