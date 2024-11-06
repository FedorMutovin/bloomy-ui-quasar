<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Task</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div>{{ task.name }}</div>
      <div>{{ task.description }}</div>
      <div>{{ task.status }}</div>
      <div>{{ task.initiated_at }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup>
defineProps({
  task: {
    type: Object,
    default: () => {}
  }
})

</script>
