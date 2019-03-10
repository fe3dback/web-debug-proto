<script>
    export default {
        props: {
            payload: Array|String,
            title_payload: {
                type: String,
                default: "Payload definition"
            },
            title_preview: {
                type: String,
                default: "Preview"
            },
        },
        computed: {
            paramList() {
                let pl = [];

                if (typeof this.payload === 'string') {
                    // dynamic load from payload
                    pl = this.$root.$options.appExtension[this.payload];
                } else {
                    // static
                    pl = this.payload;
                }

                return pl;
            },

            modelObject() {

                let model = {};

                this.paramList.forEach((prop) => {

                    let exampleObject = null;

                    if (prop.example.substr(0, 2) === '<@') {
                        // dynamic load from payload
                        let payloadId = prop.example.substr(1);
                        let dynamicProps = this.$root.$options.appExtension[payloadId];
                        exampleObject = {};
                        dynamicProps.forEach((dynamicProp) => {
                            exampleObject[dynamicProp.key] = JSON.parse(dynamicProp.example);
                        })
                    } else {
                        // static
                        exampleObject = JSON.parse(prop.example);
                    }

                    model[prop.key] = exampleObject;
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
        <h4 v-if="title_payload">{{title_payload}}</h4>
        <props-table :payload="paramList"></props-table>

        <h4 v-if="title_preview">{{title_preview}}</h4>
        <x-code-preview :code=code></x-code-preview>
    </div>
</template>
