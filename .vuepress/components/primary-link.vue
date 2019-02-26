<template>
    <centered>
        <NavLink class="primary-link" :item="actionLink"/>
    </centered>
</template>

<script>
    import NavLink from "../theme/components/NavLink";
    export default {
        components: {NavLink},
        props: ['target', 'title'],
        computed: {
            actionLink () {
                return {
                    link: this.target,
                    text: this.title
                }
            }
        }
    }
</script>

<style lang="stylus">
    .primary-link {
        display: inline-block
        text-align: center
        width: auto
        background-color: $accentColor
        color: white
        padding: 10px 20px
        border-radius: 5px
        margin-bottom: 10px
    }
</style>
