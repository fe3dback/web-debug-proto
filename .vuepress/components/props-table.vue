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
            prepareTypeForUriHash(prop) {

                if (prop.url) {
                    return prop.url;
                }

                return '/docs/scheme/types.html#' + prop.type.replace(/\[\]/g, '');
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
                    link: prepareTypeForUriHash(prop),
                    text: prop.type
                }"></NavLink>
            </td>
            <td style="text-align: center;">
                <span v-if="prop.required">Y</span>
            </td>
            <td>
                <p>{{prop.description}}</p>
                <template v-if="prop.enum_values">
                    <b>Allowed values:</b>
                    <ul>
                        <li v-for="eValue in prop.enum_values">
                            {{eValue}}
                        </li>
                    </ul>
                </template>
            </td>
        </tr>
        </tbody>
    </table>
</template>
