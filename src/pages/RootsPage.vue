<template>
  <q-card flat class="q-ma-sm">
    <div class="col-12">
      <q-card flat class="q-ma-sm">
        <RootTabs/>
      </q-card>
    </div>
  </q-card>
<!--  <q-card class="flex q-ma-sm row justify-center">-->
<!--    <div class="col-12">-->
<!--      <EverydayQuotesList />-->
<!--    </div>-->
<!--    <div class="col-12">-->
<!--      <WorkCard/>-->
<!--    </div>-->
<!--    <div class="col-12">-->
<!--      <q-card class="q-ma-sm">-->
<!--        <RootTabs/>-->
<!--      </q-card>-->
<!--    </div>-->
<!--  </q-card>-->
</template>

<script setup>
// import EverydayQuotesList from 'components/core_page/everyday_quotes/EverydayQuotesList.vue'
// import WorkCard from 'components/core_page/works/WorkCard.vue'
import RootTabs from 'components/core_page/RootTabs.vue'
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 1200px
</style>
