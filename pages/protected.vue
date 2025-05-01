<template>
    <h1>Hello, Dear {{data.user.name}}</h1>
</template>

<script setup lang = 'ts'>
const { data } = useAuth()
definePageMeta({middleware:'sidebase-auth'})

</script>