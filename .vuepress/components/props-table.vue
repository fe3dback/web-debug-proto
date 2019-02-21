<script>
    import NavLink from "../theme/components/NavLink";
    export default {
        components: {NavLink},
        props: {
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
        },
        methods: {
            prepareTypeForUriHash(typeString) {
                return typeString.replace(/\[\]/g, '');
            }
        }
    }
</script>

<template>
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
            <td>
                <NavLink :item="{
                    link: '/docs/scheme/types.html#' + prepareTypeForUriHash(prop.type),
                    text: prop.type
                }"></NavLink>
            </td>
            <td style="text-align: center;">
                <span v-if="prop.required">Y</span>
            </td>
            <td>{{prop.description}}</td>
        </tr>
        </tbody>
    </table>
</template>
