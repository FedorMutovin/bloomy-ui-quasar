<template>
  <q-layout view="hHh LpR lfr">

    <q-header bordered class="bg-primary text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-white">
          Bloomy
        </q-toolbar-title>

        <q-btn flat round icon="mdi-calendar-clock-outline" elevated @click="toggleRightDrawer" />
        <q-btn flat round icon="mdi-cog" elevated />
      </q-toolbar>
    </q-header>

<!--    <q-drawer v-model="leftDrawerOpen" side="left"  behavior="desktop" bordered>-->
<!--      &lt;!&ndash; drawer content &ndash;&gt;-->
<!--    </q-drawer>-->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above

      :mini="!leftDrawerOpen || miniState"
      @click.capture="drawerClick"

      :width="200"
      :breakpoint="500"
      bordered
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="mdi-account-arrow-up-outline" />
            </q-item-section>

            <q-item-section>
              Core
            </q-item-section>
          </q-item>

<!--          <q-item clickable v-ripple>-->
<!--            <q-item-section avatar>-->
<!--              <q-icon name="send" />-->
<!--            </q-item-section>-->

<!--            <q-item-section>-->
<!--              Send-->
<!--            </q-item-section>-->
<!--          </q-item>-->

<!--          <q-item clickable v-ripple>-->
<!--            <q-item-section avatar>-->
<!--              <q-icon name="drafts" />-->
<!--            </q-item-section>-->

<!--            <q-item-section>-->
<!--              Drafts-->
<!--            </q-item-section>-->
<!--          </q-item>-->
        </q-list>
      </q-scroll-area>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" :width="250" behavior="desktop" bordered>
      <SchedulesCard/>
    </q-drawer>

    <q-page-container class="bg-grey-3 window-height">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import SchedulesCard from 'components/schedules/SchedulesCard.vue'

const rightDrawerOpen = ref(false)
const leftDrawerOpen = ref(true)
const miniState = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function drawerClick (e) {
  // if in "mini" state and user
  // click on drawer, we switch it to "normal" mode
  if (miniState.value) {
    miniState.value = false

    // notice we have registered an event with capture flag;
    // we need to stop further propagation as this click is
    // intended for switching drawer to "normal" mode only
    e.stopPropagation()
  }
}
</script>
