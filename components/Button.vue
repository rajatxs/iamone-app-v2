<script setup lang="ts">
import { defineProps, computed, PropType } from "vue"
import { UIColor, UIBackgroundGradient } from '@/types/ui'
import Loader from './Loader.vue'
import type { LoaderColor } from './Loader.vue'

export type ButtonRole = "submit" | "reset" | "button"
export type ButtonType = "filled" | "text"
export type ButtonSize = "small" | "medium" | "large" | "block"

const props = defineProps({
   role: {
      type: String as PropType<ButtonRole>,
      default: "button",
   },
   type: {
      type: String as PropType<ButtonType>,
      default: "filled",
   },
   loading: {
      type: Boolean,
      default: false,
   },
   expanded: {
      type: Boolean,
      default: false,
   },
   gradient: {
      type: String as PropType<UIBackgroundGradient>,
      required: false,
   },
   color: {
      type: String as PropType<UIColor>,
      default: "foreground",
   },
   text: {
      type: String as PropType<UIColor>,
      required: false,
   },
   loaderColor: {
      type: String as PropType<LoaderColor>,
      default: "light",
   },
   disabled: {
      type: Boolean,
      default: false,
   },
   size: {
      type: String as PropType<ButtonSize>,
      default: "medium",
   },
})

const buttonClasses = computed(() => {
   const list = [
      "app-button",
   ];
   list.push("type__" + props.type)
   list.push("size__" + props.size)

   if (props.gradient) {
      list.push("bg-gradient-" + props.gradient)
   }

   if (props.color) {
      list.push("bg-" + props.color)
   }

   if (props.text) {
      list.push("text-" + props.text)
   }
   return list
})
</script>

<template>
   <button 
      :type="props.role" 
      :class="buttonClasses" 
      :aria-expanded="expanded" 
      :disabled="disabled"
      @click="$emit('click')">
      <Loader v-if="loading" :color="props.loaderColor" />
      <slot v-else></slot>
   </button>
</template>

<style lang="scss">
@import "@/assets/scss/vars";
@import "@/assets/scss/utils/common";

.app-button {
   display: inline-flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   margin: $gap-quarter;
   padding-left: $gap;
   padding-right: $gap;
   width: auto;
   height: 48px;
   font-size: 1rem;
   border: 0;
   cursor: pointer;
   transition: transform 140ms ease, box-shadow 160ms ease;
   transform: translateY(0);
   @include radius-medium;
}

.app-button:hover {
   box-shadow: $shadow-medium;
}

.app-button:active {
   transform: translateY(-5px);
}

.app-button:disabled {
   background-color: $accents-1;
   color: $accents-4;
   pointer-events: none;
}

.app-button.type__text {
   background-color: transparent;
   color: auto;
}

.app-button.size__small {
   min-width: 80px;
   height: 38px;
   font-size: 14px;
}

.app-button.size__large {
   min-width: 120px;
   height: 48px;
   font-size: 18px;
}

.app-button.size__block {
   width: calc(100% - $gap-half);
   margin-left: 0;
   margin-right: 0;
   padding-left: 0;
   padding-right: 0;
}
</style>
