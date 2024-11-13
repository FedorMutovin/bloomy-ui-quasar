<template>
  <div class="flex row">
    <div class="col-12 col-md-3">
      <GoalListCard/>
    </div>
    <div class="col-12 col-md-8">
      <router-view/>
    </div>
  </div>
</template>
<script setup>
import GoalListCard from 'components/goals/GoalListCard.vue'
</script>
