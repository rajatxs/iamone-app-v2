<script setup lang="ts">
import { rpc } from '@/utils/http'
import { SignupRequestPayload, SignupResponse } from '@/types/auth'
import { kvStore } from '@/utils/kvstore'
import Button from '@/components/Button.vue'

const router = useRouter()
const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const errorMessage = ref<string>('')
const loading = ref<boolean>(false)

async function signup() {
   let payload: SignupRequestPayload

   if (confirmPassword.value !== password.value) {
      errorMessage.value = 'Confirm password does not match'
      return
   }

   payload = {
      username: username.value,
      email: email.value,
      password: password.value,
   }

   errorMessage.value = ''
   loading.value = true

   try {
      const response = await rpc().call<SignupResponse>('user.Register', payload)

      kvStore.set('access-token', response.accessToken)
      kvStore.set('refresh-token', response.refreshToken)
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

onMounted(() => {
   const route = useRoute()

   if (Reflect.has(route.query, 'username')) {
      username.value = Reflect.get(route.query, 'username') as string
   }
})
</script>

<template>
   <Head>
      <Title>Signup • iamone</Title>
   </Head>

   <NuxtLayout
      name="auth"
      action="signup"
      header="Create new profile"
      :on-submit="signup">
      <div class="app-input-field xstack margin-y-medium">
         <div
            class="app-input outlined"
            aria-expanded="true">

            <input
               v-model="username"
               type="text"
               name="username"
               id="username-input-controller"
               placeholder="Create username"
               class="app-input-controller"
               autocomplete="off"
               autocapitalize="off"
               autofocus
               required />
         </div>
      </div>

      <div class="app-input-field xstack margin-y-medium">
         <div
            class="app-input outlined"
            aria-expanded="true">

            <input
               v-model="email"
               type="email"
               name="email"
               placeholder="Email address"
               class="app-input-controller"
               autocomplete="email"
               autocapitalize="off"
               required />
         </div>
      </div>

      <div class="app-input-field xstack margin-y-medium">
         <div
            class="app-input outlined"
            aria-expanded="true">

            <input
               v-model="password"
               type="password"
               name="password"
               placeholder="Create Password"
               class="app-input-controller"
               autocomplete="new-password"
               required />
         </div>
      </div>

      <div class="app-input-field xstack margin-y-medium">
         <div
            class="app-input outlined"
            aria-expanded="true">

            <input
               v-model="confirmPassword"
               type="password"
               name="confirmPassword"
               placeholder="Confirm Password"
               class="app-input-controller"
               required />
         </div>
      </div>

      <div
         v-if="errorMessage"
         class="app-auth-error-message">
         {{ errorMessage }}
      </div>

      <div class="app-input-field privacy-policy-field">
         <p>
            <small>Read&nbsp;<a href="https://developar.in/privacy" target="_blank" class="text-blue">Privacy policy</a></small>
         </p>
      </div>

      <div class="app-input-field">
         <Button
            role="submit"
            color="primary"
            size="block"
            :loading="loading"
            loader-color="background">
            Signup
         </Button>
      </div>
   </NuxtLayout>
</template>

<style lang="scss">
.privacy-policy-field {
   justify-content: center;
}
</style>
