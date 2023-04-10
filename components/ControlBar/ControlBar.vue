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

         &:hover {
            border-bottom-color: $accents-2;

            .label {
               color: $accents-6;
            }
         }

         &.active {
            border-bottom-width: 3px;
            border-bottom-color: $primary;

            .label {
               color: $foreground;
            }
         }

         .label {
            color: $accents-5;
         }
      }
   }

   .app-controlbar-activity-area {
      height: calc(100% - 98pt);
      overflow-y: auto;
   }
}

@media screen and (max-width: 1080px) {
   .app-controlbar {
      width: 100%;

      .app-controlbar-top {
         margin-left: $gap;
         margin-right: $gap;
      }
   }
}
</style>
