<template>

    <header class = "flex flex-row items-center justify-between px-4 py-[4px] bg-emerald-700 text-white text-xl">
        <div class = "px-4 py-2">
            <img src = "/assets/images/cross.png" class = "w-16 h-16 bg-transparent rounded-xl">
        </div>
        <nav class = "flex flex-row gap-2 px-2">
            <NuxtLink to = "/" class = "links">Home</NuxtLink>
            <NuxtLink to = "/protected" class = "links">Protected</NuxtLink>
            <NuxtLink to  = "/login" class = "links">LogIn</NuxtLink>
            <div class = "links" @click="signOut({callbackUrl: '/login'})">LogOut</div>
            <img :src = "data?.user?.image" v-show = "log_check" class = "w-14 h-14 border-2 border-black rounded-full">
        </nav>
    </header>

    <main class = "min-h-screen bg-gray-100 text-gray-900 text-xl flex px-8 py-4">
        <div class = "m-auto">
             <slot />
        </div>
    </main>


</template>

<style>
.links {
  @apply p-2 rounded-md hover:bg-gray-100 hover:text-black;
}

/* Формы */
.form-container {
  @apply flex flex-row gap-4 flex-wrap bg-white p-6 rounded-xl shadow-md;
}

.form-group {
  @apply flex flex-col gap-2;
}

.form-input {
  @apply text-black border border-gray-300 rounded px-2 py-1;
}

/* Кнопки */
.btn {
  @apply w-[100px] text-white rounded-xl transition-colors duration-200;
}

.btn-primary {
  @apply bg-emerald-700 hover:bg-emerald-400 hover:text-black;
}

.btn-delete {
  @apply w-[40px] rounded-full bg-emerald-700 hover:bg-emerald-400 text-white font-bold;
}

.btn-update {
  @apply w-[40px] rounded-full bg-emerald-700 hover:bg-emerald-400 text-white font-bold;
}

/* Таблица */
.table-base {
  @apply border-collapse border border-gray-300 bg-white shadow-md;
}

.table-cell {
  @apply border border-gray-300 px-4 py-2;
}

/* Модальное окно */
.modal-overlay {
  @apply flex fixed inset-0 items-center justify-center bg-black bg-opacity-50 border-2 border-gray-900;
}

.modal-input {
  @apply border-2 border-gray-400 text-center text-black rounded px-3 py-2;
}
</style>

<script setup lang = 'ts'>

const {signOut, status} = useAuth()

const log_check = computed(()=> status.value === 'authenticated')

const { data } = useAuth()

</script>

