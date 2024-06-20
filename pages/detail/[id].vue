<template>
    <div class="bg-black w-screen h-screen max-h-screen overflow-hidden relative grid grid-rows-[200px_1fr] grid-cols-[400px_1fr]">

    <div class="row-start-1 row-end-1 col-start-1 col-end-1 ml-20 mt-20">
        <div class="flex items-center">
            <NuxtLink :to="{path: '/'}" class="bg-special w-10 h-10 font-black items-center justify-center rounded-full inline-flex"><</NuxtLink>
            
            <span class="font-bold text-white ml-10">{{ name }}</span>
        </div>
    </div>

        <div class="text-white order-last row-start-1 row-end-1 col-start-3 col-end-3 w-fit justify-self-end mt-20 mr-20">
            <div class="flex justify-center items-center gap-2"><div class="w-3 h-3" style="background-color: #AAF61B;" />temperature (°C)</div>
            <div class="flex items-center gap-2"><div class="w-3 h-3" style="background-color: #92D417;" />humidity (%)</div>
            <div class="flex items-center gap-2"><div class="w-3 h-3" style="background-color: #639110;" />co2 (ppm)</div>
        </div>
        <Graph class="row-start-2 row-end-2 col-start-1 col-end-4" v-if="dataFormatted !== null" :data="dataFormatted" />
    </div>
</template>

<script setup>
const route = useRoute()

const id = route.params.id

const parseNumber = (num) => {
    const parsed = parseInt(num)

    if (isNaN(parsed)) return 0

    return parsed
}

const names = {
    'a': 'algae, alive',
    'b': 'algae, dead',
    'c': 'algae, alive + coffee',
    'd': 'algae, dead + coffee'
}

const name = computed(() => {
    return names[id]
})

const f = () => fetch("http://192.168.68.53:4000/api/change?selection=" + id.toUpperCase(), { method: 'POST', mode: 'no-cors'})
f()


const avg = (arr) => {
    return arr.reduce((a, b) => a + b, 0) / arr.length
}

const paths = {
    'a': 'https://api.thingspeak.com/channels/2581426/feeds.json?api_key=9Q87MPETGSASSBNN',
    'b': 'https://api.thingspeak.com/channels/2581486/feeds.json?api_key=TE2Y07AYHU1YNGJN',
    'c': 'https://api.thingspeak.com/channels/2581503/feeds.json?api_key=5THQ7T54E61ZTUHG',
    'd': 'https://api.thingspeak.com/channels/2580844/feeds.json?api_key=5PW9D4PSLEIOS5D3'
}


const { data, refresh, clear } = await useFetch(paths[id] + '&results=1000')

const dataFormatted = computed(() => {

    if (data.value.feeds === undefined) return null

    Array.prototype.max = function() {
        return Math.max.apply(null, this);
    };

    console.log(data.value.feeds)

    const val1 = data.value.feeds.map((item) => parseNumber(item.field1))
    const val2 = data.value.feeds.map((item) => parseNumber(item.field2))
    const val3 = data.value.feeds.map((item) => parseNumber(item.field3))
    const val4 = data.value.feeds.map((item) => parseNumber(item.field4))
    const val5 = data.value.feeds.map((item) => parseNumber(item.field5))

    const max1 = Math.max(...val1)
    const max2 = Math.max(...val2)
    const max3 = Math.max(...val3)
    const max4 = Math.max(...val4)
    const max5 = Math.max(...val5)

    const min1 = Math.min(...val1)
    const min2 = Math.min(...val2)
    const min3 = Math.min(...val3)
    const min4 = Math.min(...val4)
    const min5 = Math.min(...val5)

    const res = data.value.feeds.reduce((sum, current) => {
        // sum[0].push(((parseNumber(current.field1) - min1) / (max1 - min1)))
        sum[0].push(((parseNumber(current.field2) - min2) / (max2 - min2)) )
        sum[1].push(((parseNumber(current.field3) - min3) / (max3 - min3)) )
        sum[2].push(((parseNumber(current.field4) - min4) / (max4 - min4)) )
        // sum[4].push(((parseNumber(current.field5) - min5) / (max5 - min5)) )

        return sum
    }, [[], [], []])

    return res;
})
</script>