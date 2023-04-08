
<script setup lang="ts">
import { computed, ref } from "vue"
import { getHostname, getLivePageUrl } from '@/utils/common'
import ClipboardIcon from "@/assets/icons/clipboard.vue"

const hostname = ref<string>(getHostname())
const username = computed(() => "rxx")

const previewText = computed(() => {
   return `${hostname.value}/${username.value}`
})

function copyToClipboard() {
   const pageUrl = getLivePageUrl(username.value)
   window.navigator.clipboard.writeText(pageUrl);

   // try {
   //          this.$toast.success("Copied to clipboard");
   //       } catch (error) {
   //          this.$toast.error("Can't access your clipboard");
   //       }
}
</script>

<template>
   <div class="app-preview-link">
      <a
         class="app-preview-link-text"
         href=""
         target="_blank">{{ previewText }}</a>

      <div class="app-link-clipboard-action" @click="copyToClipboard">
         <ClipboardIcon />
      </div>
   </div>
</template>

<style lang="scss">
@import "@/assets/scss/vars";
@import "@/assets/scss/utils/common";

.app-preview-link {
   display: flex;
   flex-direction: row;
   align-items: center;
   color: inherit;
   height: 28pt;
   font-size: 10.2pt;
   background-color: $background;
   border: 1px solid $accents-2;
   @include radius-medium;

   .app-preview-link-text {
      display: flex;
      align-items: center;
      padding-left: $gap-half;
      padding-right: $gap-half;
      color: inherit;
      height: 100%;
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      transition: background-color 120ms linear;

      &:hover {
         background-color: $accents-1;
      }
   }

   .app-link-clipboard-action {
      width: 28pt;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
      background-color: transparent;
      transition: background-color 120ms linear;

      .app-icon {
         width: 11pt;
         height: 11pt;
      }

      &:hover {
         background-color: $foreground;
         color: $primary-fr;
      }
   }
}

@media (max-width: 480px) {
   .app-preview-link {
      display: none;
   }
}

body.dark .app-preview-link {
   background-color: transparent;
}
body.dark .app-preview-link-text:hover,
body.dark .app-link-clipboard-action:hover {
   background-color: $accents-1;
}
</style>
