<script setup lang="ts">
import { ref } from 'vue'
import Logo from '@/components/Logo.vue'
import PreviewLink from './PreviewLink.vue'

interface ControlBarTab {
   label: string
   path: string
}

const controlBarTabs = ref<ControlBarTab[]>([
   {
      label: "Profile",
      path: "/",
   },
   {
      label: "Design",
      path: "/design",
   },
   {
      label: "Analytics",
      path: "/analytics",
   },
   {
      label: "Settings",
      path: "/settings",
   },
])
</script>

<template>
   <div class="app-controlbar">
      <div class="app-controlbar-top">
         <Logo size="25px" />
         <PreviewLink />

         <!-- <div class="controlbar-navigation xstack gap-medium">
            <app-nav-menu-icon icon="qr" @click="SHOW_QRCODE_MODAL(true)"></app-nav-menu-icon>
            <app-nav-menu-icon icon="share-alt" @click="SHOW_SHARE_MODAL(true)"></app-nav-menu-icon>
            <app-session-menu />
         </div> -->
      </div>

      <div class="app-controlbar-tabs">
         <RouterLink
            v-for="tab in controlBarTabs"
            :to="tab.path"
            :key="tab.path"
            :exact="true"
            class="app-controlbar-tab"
            active-class="active"
            role="button">
            <span class="label">{{ tab.label }}</span>
         </RouterLink>
      </div>

      <div class="app-controlbar-activity-area regular-scroll">
         <slot></slot>
      </div>
   </div>
</template>

<style lang="scss">
@import "@/assets/scss/vars";

.app-controlbar {
   width: 60vw;
   height: inherit;
   background-color: $accents-1;
   overflow: hidden;

   .app-controlbar-top {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-top: $gap;
      padding-bottom: $gap;
      margin-left: 42pt;
      margin-right: 42pt;
   }

   .app-controlbar-tabs {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      height: 34px;
      gap: 28pt;

      .app-controlbar-tab {
         border-bottom-width: 2px;
         border-bottom-style: solid;
         border-bottom-color: transparent;
         box-sizing: border-box;
         transition: border-bottom-color 120ms linear;
      }
      .app-controlbar-tab .label {
         color: $accents-5;
      }
      .app-controlbar-tab:hover {
         border-bottom-color: $accents-2;
      }
      .app-controlbar-tab:hover .label {
         color: $accents-6;
      }
      .app-controlbar-tab.active {
         border-bottom-width: 3px;
         border-bottom-color: $primary;
      }
      .app-controlbar-tab.active .label {
         color: $foreground;
      }
   }

   .app-controlbar-activity-area {
      height: calc(100% - 98pt);
      overflow-y: auto;
   }
}
</style>
