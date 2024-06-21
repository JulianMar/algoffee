<template>
    <div class="h-screen w-screen bg-black flex justify-center items-center gap-32">
        <Button to="/detail/a">A</Button>
        <Button to="/detail/b">B</Button>
        <Button to="/detail/c">C</Button>
        <Button to="/detail/d">D</Button>
    </div>
</template>

<script setup>
const f = () => fetch("https://192.168.68.59:4000/api/change?selection=E", {method: 'POST', mode: 'no-cors'})
f()
</script>