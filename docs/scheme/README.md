---
title: Scheme
lang: en-US
---

## JSON

Scheme should be described in JSON

You can read more about JSON here:
[rfc7151 JSON](https://tools.ietf.org/html/rfc7159)

## Scheme definition

<type-definition title_payload="" title_preview="" :payload='[

    {
        key: "id",
        type: "uuid",
        required: true,
        description: "unique request id (uuid)",
        example: "\"ef95a542-25a3-4f71-a0e9-640c92f43813\""
    },

    {
        key: "version",
        type: "int",
        required: true,
        description: "scheme version",
        example: "1"
    },

    {
        key: "events",
        type: "event[]",
        required: true,
        description: "debug/profile information about request",
        example: "[]",
        url: "/docs/scheme/#event-definition"
    },

]' />

<note title="Note">

- Scheme is sort of logs (events) list with context (payload).
- Scheme can by recursive (Tree structure)
- Events in scheme will be sorted from oldest to newest

</note>

### Event definition

<type-definition title_payload="" :payload='[

    {
        key: "type",
        type: "eventType",
        required: true,
        description: "event type define object properties of `payload`",
        example: "\"log\"",
        url: "/docs/scheme/#event-type-definition"
    },

    {
        key: "payload",
        type: "object",
        required: true,
        description: "event details (context). Available properties depend on event type",
        example: "{}"
    },

    {
        key: "tags",
        type: "tag[]",
        required: false,
        description: "used for filtering in client",
        example: "[\"db:mysql\",\"server:php_03\",\"is_production\"]"
    },

    {
        key: "importance",
        type: "importance",
        required: false,
        description: "used for filtering in client",
        example: "4"
    },

    {
        key: "time",
        type: "tsMs",
        required: false,
        description: "event date-time in ms",
        example: "1547058563454"
    },

    {
        key: "duration",
        type: "durationMs",
        required: false,
        description: "event duration in ms",
        example: "15"
    },

    {
        key: "success",
        type: "bool",
        required: false,
        description: "false in case of error / alarm. Will be highlighted in client",
        example: "true"
    },

    {
        key: "calledFrom",
        type: "location",
        required: false,
        description: "code location, where this event is called from (ex. controller where template is being rendered)",
        example: "<@type-location"
    },

    {
        key: "definedIn",
        type: "location",
        required: false,
        description: "where code defined in (ex. path to template file)",
        example: "<@type-location"
    },

    {
        key: "nested",
        type: "event[]",
        required: false,
        description: "contains other nested Events",
        example: "[]",
        url: "/docs/scheme/#event-definition"
    },

]' />

### Event Type definition

This is known list of event types, but you can use any own types

| type | event description |
| --- | ----------- |
| [log](events.html#log) | application logs |
| [query](events.html#query) | database queries during request |
| [request](events.html#request) | request received event, payload contain all request props (method, uri, cookies, params, etc..) |
| [response](events.html#template) | response event before output, payload contain response properties (status code, total duration, etc..) |
| [middleware](events.html#middleware) | middleware triggered event |
| [template](events.html#template) | rendered templates |
| [email](events.html#email) | sent email events |
| [event](events.html#event) | executed code events or hooks |
| [accessCheck](events.html#accessCheck) | checked permissions during request |

### Example of scheme

<<< @/examples/scheme_v1.json
