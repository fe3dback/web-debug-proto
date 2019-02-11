<template>
    <centered>
        <img :src="$withBase(uri)" :alt="alt">
    </centered>
</template>

<script>
    export default {
        props: ['uri', 'alt']
    }
</script>
