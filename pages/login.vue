<script setup lang="ts">
import { api } from '@/utils/http'
import { LoginRequestPayload, LoginResponse } from '@/types/auth'
import { kvStore } from '@/utils/kvstore'
import Button from '@/components/Button.vue'

const router = useRouter()
const identifier = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string>('')
const loading = ref<boolean>(false)

async function login() {
   let payload: LoginRequestPayload = {
      password: password.value,
   }

   errorMessage.value = ''

   if (identifier.value.includes('@')) {
      payload['email'] = identifier.value
   } else {
      payload['username'] = identifier.value
   }

   loading.value = true

   try {
      const response = await api().post<LoginResponse>('/user/token', payload)

      kvStore.set('access-token', response.result.accessToken)
      kvStore.set('refresh-token', response.result.refreshToken)
      router.push({ path: '/' })
   } catch (error: any) {
      console.error(error)
      if (error instanceof TypeError) {
         errorMessage.value = 'Network error'
      } else {
         errorMessage.value = error.message
      }
   }

   loading.value = false
}
</script>

<template>
   <Head>
      <Title>Login • iamone</Title>
   </Head>

   <NuxtLayout
      name="auth"
      action="login"
      header="Continue to iamone"
      :on-submit="login">
      <div class="app-input-field">
         <div
            class="app-input outlined" 
            aria-expanded="true">

            <input
               v-model="identifier"
               type="text"
               name="address"
               placeholder="Username or Email"
               class="app-input-controller"
               autocapitalize="off"
               autofocus
               required />
         </div>
      </div>

      <div class="app-input-field">
         <div
            class="app-input outlined"
            aria-expanded="true">

            <input
               v-model="password"
               type="password"
               name="password"
               placeholder="Password"
               class="app-input-controller"
               autocomplete="current-password"
               required />
         </div>
      </div>

      <div
         v-if="errorMessage"
         class="app-auth-error-message">
         {{ errorMessage }}
      </div>

      <div class="app-input-field forgot-password-field">
         <a
            href="/reset-password.html"
            target="_blank"
            class="text-center text-accents-5">
            <small>Forgot password?</small>
         </a>
      </div>

      <br />

      <div class="app-input-field">
         <Button
            role="submit"
            color="primary"
            size="block"
            :loading="loading"
            loader-color="background">
            Login
         </Button>
      </div>
   </NuxtLayout>
</template>

<style lang="scss">
.forgot-password-field {
   justify-content: flex-end;
}
</style>
