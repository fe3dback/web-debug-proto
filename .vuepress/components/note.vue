<template>
    <div class="note">
        <p v-if=title class="title">{{title}}</p>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: ['title']
    }
</script>


<style lang="stylus">
    .title {
        color #333;
        font-weight: 600;
        margin-bottom: -0.4rem;
        line-height: 1.7;
    }

    .note {
        padding: 0.1rem 1.5rem;
        border-color #555
        background-color: #eee;
        border-left-width: 0.5rem;
        border-left-style: solid;
        margin: 1rem 0;
        display block

        color #444
        font-size 12px
        line-height 14px
    }
</style>
