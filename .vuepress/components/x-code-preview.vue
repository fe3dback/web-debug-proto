<template>
    <pre :class="{'stacked-code-block': isStacked}"><code v-html="codeHighlighted()"></code></pre>
</template>

<script>
    let JsonGrammar = {
        'property': /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
        'string': {
            pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
            greedy: true
        },
        'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
        'punctuation': /[{}[\]);,]/,
        'operator': /:/g,
        'boolean': /\b(?:true|false)\b/i,
        'null': /\bnull\b/i
    };

    export default {
        data() {
            return {
                _prismRef: null
            }
        },
        created() {
            import('prismjs').then(module => {
                this._prismRef = module;
                this.$forceUpdate();
            })
        },
        props: {
            code: String,
            isStacked: Boolean,
        },
        methods: {
            codeHighlighted() {
                if (this._prismRef) {
                    return this._prismRef.highlight(this.code, JsonGrammar, 'json')
                }

                return this.code;
            }
        }
    }
</script>

<style>
    .stacked-code-block {
        margin: 0 !important;
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0  !important;
    }
</style>
