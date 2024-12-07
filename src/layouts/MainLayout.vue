<template>
  <q-layout view="hHh LpR lfr">

    <q-header reveal class="bg-white text-black q-pa-sm">
      <q-toolbar >
<!--        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />-->
        <q-space/>
        <q-toolbar-title class="text-accent text-weight-bolder">
          Bloomy
        </q-toolbar-title>

        <q-btn flat round color="blue-grey-9" icon="mdi-calendar-clock-outline" elevated @click="toggleRightDrawer" />
        <q-btn flat round color="blue-grey-9" icon="mdi-cog" elevated />
      </q-toolbar>
      <q-toolbar inset>
        <q-btn-toggle
          v-model="page"
          toggle-color="primary"
          color="grey-4"
          rounded
          unelevated
          text-color="blue-grey-9"
          :options="pages"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" :width="250" behavior="desktop" bordered>
      <SchedulesCard/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import SchedulesCard from 'components/schedules/SchedulesCard.vue'
import { useUserStore } from 'stores/user_store'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const rightDrawerOpen = ref(false)
// const leftDrawerOpen = ref(false)
const pages = [
  {
    icon: 'mdi-sprout',
    label: 'roots',
    value: 'roots'
  },
  {
    icon: 'mdi-family-tree',
    label: 'map',
    value: 'map'
  }
]
const page = ref(route.name || pages[0].value)

watch([page],
  () => {
    navigateToPage(page.value)
  }
)

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

// const toggleLeftDrawer = () => {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }

const navigateToPage = (value) => {
  router.push({ name: value })
}

onMounted(async () => {
  if (!userStore.id) {
    await userStore.getCurrent()
  }
})
</script>
