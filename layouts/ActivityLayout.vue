<script setup lang="ts">
import { defineProps } from 'vue'
import ControlBar from '@/components/ControlBar/index.vue'

const props = defineProps({
   title: {
      type: String,
      default: 'Dashboard • iamone'
   },
})
</script>

<template>
   <Head>
      <Title>{{ props.title }}</Title>
   </Head>

   <main class="activity-layout-root">
      <ControlBar />
   </main>
</template>

<style lang="scss">
@import "@/assets/scss/vars";

.activity-layout-root {
   display: flex;
   width: 100%;
   height: 100%;
   background-color: $background;
}
.universal-data-loading {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: rgba(255, 255, 255, 0.8);
}
body.dark .universal-data-loading {
   background-color: $background;
}
body.dark .universal-data-loading .universal-data-loading-image {
   filter: invert(0);
}
</style>
