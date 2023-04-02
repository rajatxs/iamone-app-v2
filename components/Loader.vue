<script setup lang="ts">
import { defineProps, PropType, computed } from "vue"
import { UIColor } from '@/types/ui'

export type LoaderColor = 'foreground' | 'background' | 'primary'

const props = defineProps({
   color: {
      type: String as PropType<LoaderColor>,
      default: "foreground",
   },
   size: {
      type: Number,
      default: 18
   }
})

const loaderStyles = computed(() => {
   const size = props.size + 'px'

   return {
      width: size,
      height: size
   }
})

const loaderClasses = computed(() => {
   const list = ["app-loader"]
   list.push("fill__" + props.color)
   return list
})
</script>

<template>
   <div :class="loaderClasses" :style="loaderStyles">
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
   </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/vars";

@keyframes app-loader {
   100% {
      transform: rotate(360deg);
   }
}

@keyframes app-loader-dot {

   80%,
   100% {
      transform: rotate(360deg);
   }
}

@keyframes app-loader-dot-before {
   50% {
      transform: scale(0.4);
   }

   100%,
   0% {
      transform: scale(1);
   }
}

.app-loader {
   position: relative;
   animation: app-loader 2.5s infinite linear both;

   &.fill__foreground>.app-loader-dot:before {
      background-color: $foreground;
   }

   &.fill__background>.app-loader-dot:before {
      background-color: $background;
   }

   &.fill__primary>.app-loader-dot:before {
      background-color: $primary;
   }

   .app-loader-dot {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      animation: app-loader-dot 2s infinite ease-in-out both;

      &:before {
         content: "";
         display: block;
         width: 25%;
         height: 25%;
         border-radius: 100%;
         animation: app-loader-dot-before 2s infinite ease-in-out both;
      }

      &.app-loader-dot:nth-child(1) {
         animation-delay: -1.1s;
      }

      &.app-loader-dot:nth-child(2) {
         animation-delay: -1s;
      }

      &.app-loader-dot:nth-child(3) {
         animation-delay: -0.9s;
      }

      &.app-loader-dot:nth-child(4) {
         animation-delay: -0.8s;
      }

      &.app-loader-dot:nth-child(5) {
         animation-delay: -0.7s;
      }

      &.app-loader-dot:nth-child(6) {
         animation-delay: -0.6s;
      }

      &.app-loader-dot:nth-child(1):before {
         animation-delay: -1.1s;
      }

      &.app-loader-dot:nth-child(2):before {
         animation-delay: -1s;
      }

      &.app-loader-dot:nth-child(3):before {
         animation-delay: -0.9s;
      }

      &.app-loader-dot:nth-child(4):before {
         animation-delay: -0.8s;
      }

      &.app-loader-dot:nth-child(5):before {
         animation-delay: -0.7s;
      }

      &.app-loader-dot:nth-child(6):before {
         animation-delay: -0.6s;
      }
   }
}
</style>
