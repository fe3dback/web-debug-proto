<template>
    <div>
        <h6 class="example-title">model:</h6>
        <div class="language-json extra-class">
            <pre class="language-json" v-html="code"></pre>
        </div>
    </div>
</template>

<script>
    let models = {
        'user': {
            id: 123,
            name: "Hello world"
        }
    };

    export default {
        data () {
            return {
                value: {}
            }
        },
        computed: {
            code() {
                return `<code>${this.model}</code>`;
            },
            model() {
                let text = JSON.stringify(this.value, null, 4);
                return text;
                // return Prism2.highlight(
                //     text,
                //     Prism2.languages['js'], 'js'
                // );
            }
        },
        mounted() {
            try {
                let content = this.$slots.default[0].text;
                let contentWithModels = this.replaceModels(content, models);
                this.value = JSON.parse(contentWithModels);
            } catch (e) {
                this.value = "Error: " + e
            }
        },
        methods: {
            replaceModels(text, models) {
                Object.getOwnPropertyNames(models).forEach((modelName) => {
                    let re = new RegExp('\\%' + modelName + '\\%', 'g');
                    text = text.replace(
                        re,
                        JSON.stringify(models[modelName], null, 4)
                    );
                });

                return text;
            }
        }
    }
</script>

<style>
    .example-title {
        color: #333;
        margin-bottom: 2px;
        display: block;
    }
    .example-block {
        background-color: #212121;
        color: #ccc;
        font-family: monospace;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        padding: 1.25rem 1.5rem;
        margin: 0 0 0.85rem 0;
    }
</style>
