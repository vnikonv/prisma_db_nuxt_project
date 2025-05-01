<template>
    <p1>{{ token|| 'no token present, are you logged?' }}</p1>
</template>


<script setup lang = "ts">
    definePageMeta({auth: false})
    const headers = useRequestHeaders(['cookie']) as HeadersInit
    const {data: token} = await useFetch('/api/token', { headers })

</script>