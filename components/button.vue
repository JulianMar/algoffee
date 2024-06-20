<template>
    <NuxtLink  :to="to" class="text-black w-24 h-24 flex justify-center items-center rounded-full bg-special font-bold"><slot></slot></NuxtLink>
</template>

<script setup>
defineProps(['to'])
</script>