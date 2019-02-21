<template>
    <div>
        <h4>Preview</h4>
        <div class="btn-group">
            <div class="btn" :class="{'btn-active': isModePayload}" @click="setMode('payload')">Only payload</div>
            <div class="btn" :class="{'btn-active': isModeExample}" @click="setMode('example')">Example</div>
        </div>

        <div v-if="isModeExample">
            <x-code-preview :code=codeExample></x-code-preview>
        </div>
        <div v-if="isModePayload">
            <x-code-preview :code=codePayload></x-code-preview>
        </div>

        <h4>Payload definition</h4>
        <table>
            <thead>
                <tr>
                    <th>key</th>
                    <th>type</th>
                    <th>required</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="prop in this.payload">
                    <td>{{prop.key}}</td>
                    <td>{{prop.type}}</td>
                    <td style="text-align: center;">
                        <span v-if="prop.required">Y</span>
                    </td>
                    <td>{{prop.description}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="stylus">
    .btn-group {
        display: block;
        margin-bottom: 5px;
        width: 100%;
        border-bottom: 1px solid $arrowBgColor;
    }
    .btn {
        cursor: pointer;
        text-align: center;
        font-size: 12px;
        line-height: 14px;
        display: inline-block;
        width: 100px;
        border: 1px solid $arrowBgColor;
        border-bottom: none;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 5px 10px;
        margin: 0;
        color: $textColor;
    }
    .btn-active {
        background-color: $accentColor;
        color: white;
    }
</style>

<script>
    export default {
        props: {
            type: {
                type: String,
                required: true
            },
            payload: {
                type: Array,
                required: true,
                validator(list) {
                    list.forEach((v) => {
                        if (typeof v.key === 'undefined') {
                            return false;
                        }
                        if (typeof v.type === "undefined") {
                            return false;
                        }
                        if (typeof v.required === "undefined") {
                            return false;
                        }
                        if (typeof v.description === "undefined") {
                            return false;
                        }
                        if (typeof v.example === "undefined") {
                            return false;
                        }
                    });

                    return typeof list === 'object';
                }
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
                default: null
            },
            duration: {
                type: [Number],
                default: null
            },
            success: {
                type: [Boolean],
                default: null
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
                mode: 'payload'
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
                    model.payload[prop.key] = JSON.parse(prop.example)
                });

                return model
            },

            modelPayload() {
                return this.modelExample.payload;
            },
            codePayload() {
                return JSON.stringify(this.modelPayload, null, 2);
            },
            codeExample() {
                return JSON.stringify(this.modelExample, null, 2);
            },
            isModePayload() {
                return this.mode === 'payload';
            },
            isModeExample() {
                return this.mode === 'example';
            },
        },
        methods: {
            setMode(mode) {
                this.mode = mode
            },
        }
    }
</script>
