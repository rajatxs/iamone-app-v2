<script setup lang="ts">
export type AuthAction = 'login' | 'signup'

const props = defineProps({
   action: {
      type: String as PropType<AuthAction>,
      required: true,
   },
   header: {
      type: String,
      required: true,
   },
   onSubmit: {
      type: Function,
      required: false,
   }
})
</script>

<template>
   <div class="auth-layout-root" :data-auth-action="props.action">
      <div class="auth-layout-container">
         <div class="auth-layout-header">
            <img 
               class="auth-layout-image" 
               src="https://rajatxs.github.io/iamone-static/icons/iamone.svg" 
               alt="iamone" />
         </div>

         <div class="auth-layout-action-switch">
            <RouterLink to="/login" class="auth-layout-action-switch-button" active-class="active">Login</RouterLink>
            <RouterLink to="/signup" class="auth-layout-action-switch-button" active-class="active">Signup</RouterLink>
         </div>

         <div class="auth-layout-activity-area">
            <div class="auth-layout-activity-header">
               <h3>{{ props.header }}</h3>
            </div>

            <form 
               :name="props.action" 
               class="auth-layout-controls" 
               @submit.prevent="props.onSubmit">
               <slot></slot>
            </form>
         </div>
      </div>
   </div>
</template>

<style lang="scss">
@import "@/assets/scss/vars";
@import "@/assets/scss/utils/common";
@import "@/assets/scss/utils/colors";
@import "@/assets/scss/utils/shadows";
@import "@/assets/scss/utils/scale";

.app-input-field {
   display: flex;
   flex-direction: row;
   margin-top: $gap-half;
   margin-bottom: $gap-half;
}
.app-auth-error-message {
   color: $error;
   text-align: center;
}

.auth-layout-root {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100%;
   @include bg-gradient-3;

   .auth-layout-container {
      width: 420pt;
      padding-top: $gap + $gap-half;
      padding-bottom: $gap + $gap-half;
      display: inherit;
      flex-direction: inherit;
      justify-content: center;

      @include shadow-medium;
      @include bg-background;

      @include scale-small {
         height: 100%;
         width: 100%;
      }

      @include scale-medium {
         height: 100%;
      }

      @include scale-large {
         height: auto;
         @include radius-medium;
      }

      .auth-layout-header {
         display: flex;
         flex-direction: row;
         justify-content: center;
         margin-top: $gap-half;
         margin-bottom: $gap-half;
         width: auto;
         height: 28pt;

         .auth-layout-image {
            width: 100%;
            height: 100%;
         }
      }

      .auth-layout-action-switch {
         display: flex;
         flex-direction: row;
         justify-content: space-between;
         align-items: center;
         margin-left: auto;
         margin-right: auto;
         padding: $gap-quarter;
         gap: $gap-quarter;
         width: 190px;
         height: 30px;
         border-radius: 25px;
         margin-top: 20pt;
         border: 1px solid $accents-2;
      }

      .auth-layout-action-switch-button {
         display: flex;
         outline: none;
         align-items: center;
         border: none;
         justify-content: center;
         flex: 1;
         height: inherit;
         border-radius: inherit;
         font-size: 92%;
         background-color: transparent;
         color: inherit;
         cursor: pointer;
         transition: background-color 40ms linear;
      }

      .auth-layout-action-switch-button:hover {
         background-color: $accents-1;
      }

      .auth-layout-action-switch-button.active {
         background-color: $accents-2;
      }

      .auth-layout-activity-header {
         margin-top: 24pt;
         padding-bottom: $gap-half;
         text-align: center;
      }

      .auth-layout-controls {
         width: 250pt;
         margin-left: auto;
         margin-right: auto;
      }
   }
}
</style>
