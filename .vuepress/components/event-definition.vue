<script>
    export default {
        props: {
            payload: Array,
            type: {
                type: String,
                required: true
            },
            tags: {
                type: Array,
                default: () => {
                    return ["is_production", "scope:api", "server:php_03"]
                }
            },
            importance: {
                type: [String, Number],
                default: 4
            },
            time: {
                type: [Number],
                default: 1547058563454
            },
            duration: {
                type: [Number],
                default: 14
            },
            success: {
                type: [Boolean],
                default: true
            },
            defined_in: {
                type: [Object],
                default: () => {
                    return {
                        file: "/src/renderer/main.js",
                        line: 123
                    }
                }
            },
            called_from: {
                type: [Object],
                default: () => {
                    return {
                        file: "/src/Http/Middleware/Auth.php",
                        line: 95,
                        pos: 8,
                        pos_end: 72,
                    }
                }
            }
        },
        data() {
            return {
                mode: 'payload-0'
            }
        },
        computed: {
            modelExample() {

                let model = {
                    type: this.type,
                    payload: {}
                };

                // optional props
                if (this.tags) {
                    model['tags'] = this.tags;
                }
                if (this.importance) {
                    model['importance'] = this.importance;
                }
                if (this.time) {
                    model['time'] = this.time;
                }
                if (this.duration) {
                    model['duration'] = this.duration;
                }
                if (this.success) {
                    model['success'] = this.success;
                }
                if (this.defined_in) {
                    model['defined_in'] = this.defined_in;
                }
                if (this.called_from) {
                    model['called_from'] = this.called_from;
                }

                this.payload.forEach((prop) => {

                    let examples = [];
                    if (typeof prop.example === 'object') {
                        examples = prop.example;
                    } else {
                        examples.push(prop.example)
                    }

                    model.payload[prop.key] = JSON.parse(examples.shift())
                });

                return model
            },

            codePayloadVariants() {

                let variants = [];
                this.payload.forEach((prop) => {

                    let examples = [];

                    if (typeof prop.example === 'object') {
                        examples = prop.example;
                    } else {
                        examples.push(prop.example)
                    }

                    examples.forEach((exp, ind) => {
                        if (typeof variants[ind] === 'undefined') {
                            variants[ind] = {};
                        }

                        variants[ind][prop.key] = JSON.parse(exp);
                    });
                });

                return variants.map((obj) => {
                    return JSON.stringify(obj, null, 2);
                })
            },
            codeExample() {
                return JSON.stringify(this.modelExample, null, 2);
            },
            isModeExample() {
                return this.mode === 'example';
            },
        },
        methods: {
            isModePayload(ind) {
                return this.mode === `payload-${ind}`;
            },
            setMode(mode) {
                this.mode = mode
            }
        }
    }
</script>

<template>
    <div>
        <h4>Payload definition</h4>
        <props-table :payload="payload"></props-table>

        <h4>Preview</h4>
        <div class="btn-group">
            <div v-for="v, ind in codePayloadVariants" class="btn" :class="{'btn-active': isModePayload(ind)}" @click="setMode(`payload-${ind}`)">
                <span v-if="codePayloadVariants.length >= 2">Payload only (ex. #{{ind + 1}})</span>
                <span v-else>Payload only</span>
            </div>
            <div class="btn" :class="{'btn-active': isModeExample}" @click="setMode('example')">
                Full package
            </div>
        </div>

        <div v-for="vCode, ind in codePayloadVariants" v-if="isModePayload(ind)">
            <x-code-preview :code=vCode :isStacked=true></x-code-preview>
        </div>
        <div v-if="isModeExample">
            <x-code-preview :code=codeExample :isStacked=true></x-code-preview>
        </div>
    </div>
</template>

<style lang="stylus">
    .btn-group {
        display: block;
        max-width: 100%;
        padding: 5px 0 0 10px;
        height: 25px;
        background-color: #f1f1f1;
    }
    .btn {
        cursor: pointer;
        text-align: center;
        font-size: 12px;
        line-height: 14px;
        display: inline-block;
        min-width: 100px;
        border: 1px solid #c2c2c2;
        border-bottom: none;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 5px 10px;
        margin: 0;
        color: $textColor;
        background-color: white;
        height: 25px;
        box-sizing: border-box;
        font-weight: bold;
    }
    .btn-active {
        background-color: #212121;
        color: #e7c000;
        border-color: #e7c000;
    }
</style>
