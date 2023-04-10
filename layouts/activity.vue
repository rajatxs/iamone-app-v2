<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import ControlBar from '@/components/ControlBar/ControlBar.vue'
import MockupView from '@/components/MockupView/MockupView.vue'

const enablePreview = ref<boolean>(false)

const props = defineProps({
   title: {
      type: String,
      default: 'Dashboard'
   },
})

function onWindowResize(): void {
   if (window.innerWidth < 1080 && enablePreview.value) {
      enablePreview.value = false
   } else if (window.innerWidth > 1080 && !enablePreview.value) {
      enablePreview.value = true
   }
}

onMounted(() => {
   window.onresize = onWindowResize

   onWindowResize()
})
</script>

<template>
   <Head>
      <Title>{{ props.title }} • iamone</Title>
   </Head>

   <main class="activity-layout-root">
      <ControlBar />
      <MockupView v-if="enablePreview" />
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
