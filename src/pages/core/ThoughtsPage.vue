<template>
  <div class="flex row">
    <div class="col-12 col-md-3">
      <ThoughtListCard/>
    </div>
    <div class="col-12 col-md-8">
      <router-view/>
    </div>
  </div>
</template>
<script setup>
import ThoughtListCard from 'components/thoughts/ThoughtListCard.vue'
</script>
