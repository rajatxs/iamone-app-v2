<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
   size: {
      type: String,
      default: "22pt",
   },
})

const logoStyle = computed(() => ({ height: props.size }))
</script>

<template>
   <div class="app-logo" :style="logoStyle">
      <img 
         src="https://rajatxs.github.io/iamone-static/icons/iamone.svg" 
         class="app-logo-image"
         alt="iamone" />
   </div>
</template>

<style lang="scss">
@import "@/assets/scss/vars";

.app-logo {
   display: flex;
   width: auto;
   flex-direction: row;
   align-items: center;
   margin-top: $gap-half;
   margin-bottom: $gap-half;
   
   .app-logo-image {
      width: auto;
      height: 100%;
   }
}
</style>
