<template>
  <q-layout view="hHh LpR lfr">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-accent">
          Bloomy
        </q-toolbar-title>

        <q-btn flat round color="blue-grey-9" icon="mdi-calendar-clock-outline" elevated @click="toggleRightDrawer" />
        <q-btn flat round color="blue-grey-9" icon="mdi-cog" elevated />
      </q-toolbar>
    </q-header>

<!--    <q-drawer v-model="leftDrawerOpen" side="left"  behavior="desktop" bordered>-->
<!--      &lt;!&ndash; drawer content &ndash;&gt;-->
<!--    </q-drawer>-->

    <q-drawer
      v-model="leftDrawerOpen"
      :width="200"
      :breakpoint="500"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>

          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item :to="menuItem.path" clickable :active="menuItem.label === 'Core'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" :width="250" behavior="desktop" bordered>
      <SchedulesCard/>
    </q-drawer>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import SchedulesCard from 'components/schedules/SchedulesCard.vue'
import { useUserStore } from 'stores/user_store'

const userStore = useUserStore()
const rightDrawerOpen = ref(false)
const leftDrawerOpen = ref(false)
const menuList = [
  {
    icon: 'mdi-run-fast',
    label: 'Core',
    separator: false,
    path: '/core'
  },
  {
    icon: 'mdi-gamepad-variant-outline',
    label: 'Interests',
    separator: false,
    path: '/interests'
  }
]
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

onMounted(async () => {
  if (!userStore.id) {
    await userStore.getCurrent()
  }
})
</script>
