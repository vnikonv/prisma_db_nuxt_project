<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent = "handleLogin">
    <div>
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-white dark:text-white"
        >Email</label
      >
      <input
        type="email"
        v-model = 'email'
        name="email"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@company.com"
        required=""
      />
    </div>
    <div>
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-white dark:text-white"
        >Password</label
      >
      <input
        type="password"
        name="password"
        v-model = 'password'
        id="password"
        placeholder="••••••••"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required=""
      />
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input
            id="remember"
            aria-describedby="remember"
            type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            required=""
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="remember" class="text-white dark:text-gray-300"
            >Remember me</label
          >
        </div>
      </div>
      
    </div>
    <button
    type = "submit"
      class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Sign in
    </button>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Don’t have an account yet?
      <a
        href="#"
        @click = "handleSignUp"
        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >Sign up</a
      >
    </p>
  </form>
</template>

<script setup lang = "ts">

import { useRouter } from 'vue-router'
const router = useRouter()

import {ref} from 'vue'
const {signIn} = useAuth()
const {status} = useAuth()
const email = ref<any>('')
const password = ref<any>('')

const handleLogin = async () => {
  const result = await signIn('credentials', {
    email: email.value,
    password: password.value,
    callbackUrl: '/protected',
    redirect:false
  })

  if (result?.error) {
    alert('❌ Ошибка входа: ' + result.error)
  } else if (result?.ok && result.url) {
    window.location.href = result.url
  }
}

const handleSignUp = async () => {
  try {
    const response = await $fetch('/api/signup', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    // После успешной регистрации автоматически входим
    await handleLogin()
    
  } catch (error) {
    console.error('Registration error:', error)
    alert('Registration failed: ' + error)
  }
}


</script>
