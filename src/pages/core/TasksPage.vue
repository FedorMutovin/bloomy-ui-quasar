<template>
  <div class="flex row">
    <div class="col-12 col-md-3">
      <TaskListCard/>
    </div>
    <div class="col-12 col-md-8">
      <router-view/>
    </div>
  </div>
</template>
<script setup>
import TaskListCard from 'components/tasks/TaskListCard.vue'
</script>
