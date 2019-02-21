<script>
    export default {
        props: {
            payload: Array
        },
        computed: {
            modelObject() {

                let model = {};

                this.payload.forEach((prop) => {
                    model[prop.key] = JSON.parse(prop.example)
                });

                return model
            },

            code() {
                return JSON.stringify(this.modelObject, null, 2);
            }
        }
    }
</script>

<template>
    <div>
        <h4>Payload definition</h4>
        <props-table :payload="payload"></props-table>

        <h4>Preview</h4>
        <x-code-preview :code=code></x-code-preview>
    </div>
</template>
