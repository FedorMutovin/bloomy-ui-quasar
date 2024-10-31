<template>
  <WishCard :wishId="wishId"/>
</template>

<script setup>
defineOptions({
  name: 'WishPage'
})

import { useRoute } from 'vue-router'
const route = useRoute()
const wishId = route.params.id

import WishCard from 'components/wishes/WishCard.vue'
</script>
