<template>
  <div class="flex row">
    <div class="col-12 col-md-3">
      <ThoughtListCard @item-selected="handleSelected"/>
    </div>
    <div class="col-12 col-md-9">
      <ThoughtCard :thoughtId="id" v-if="id"/>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import ThoughtListCard from 'components/core_page/thoughts/ThoughtListCard.vue'
import ThoughtCard from 'components/core_page/thoughts/ThoughtCard.vue'
import { useThoughtStore } from 'stores/thought_store'

const id = ref(null)
const thoughtStore = useThoughtStore()

function handleSelected (selectedId) {
  id.value = selectedId
}

onMounted(async () => {
  await thoughtStore.getForUser()
  if (thoughtStore.thoughts) {
    id.value = thoughtStore.thoughts[0].id
  }
})
</script>
